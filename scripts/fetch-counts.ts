import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PROJECT_REPOS } from '../src/content/projects'

/**
 * Rewrites `src/generated/repo-counts.ts` from the GitHub API.
 *
 * Deliberately not part of `pnpm build`: the build has to render the same
 * README from the same source for CI to diff it, while these numbers change
 * on their own. The weekly workflow runs this first, then the build, and
 * commits both.
 *
 * Reads `GITHUB_TOKEN`. Any token raises the rate limit and reaches public
 * repos; private ones additionally need that token to be granted them.
 *
 * Exits non-zero if any repo could not be read, having first written every
 * count it did get. A repo that fails keeps the number already committed,
 * so a dead token leaves the README stale rather than wrong.
 */

type RepoCounts = { commits: number; prs: number }

const OWNER = 'bvandrc'
const token = process.env.GITHUB_TOKEN

const headers: Record<string, string> = {
  'User-Agent': 'bvandrc-readme',
  Accept: 'application/vnd.github+json',
}
if (token) {
  headers.Authorization = `Bearer ${token}`
}

/**
 * Total number of items behind a paginated list endpoint.
 *
 * With per_page=1 the Link header's rel="last" page number *is* the total,
 * which avoids walking the pages.
 */
const total = async (url: string) => {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${url}`)
  }
  const last = res.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)
  return last ? Number(last[1]) : ((await res.json()) as unknown[]).length
}

const fetchCounts = async (repo: string): Promise<RepoCounts> => {
  const base = `https://api.github.com/repos/${OWNER}/${repo}`
  const [commits, prs] = await Promise.all([
    total(`${base}/commits?per_page=1`),
    total(`${base}/pulls?state=all&per_page=1`),
  ])
  return { commits, prs }
}

const previous: Record<string, RepoCounts | undefined> = await import(
  '../src/generated/repo-counts'
)
  .then((module) => module.REPO_COUNTS)
  .catch(() => ({}))

const counts: Record<string, RepoCounts> = {}
const failed: string[] = []

for (const repo of PROJECT_REPOS) {
  try {
    counts[repo] = await fetchCounts(repo)
  } catch (error) {
    const kept = previous[repo]
    failed.push(`${repo}: ${error instanceof Error ? error.message : error}`)
    if (kept) {
      counts[repo] = kept
    }
  }
}

const entries = Object.keys(counts)
  .sort()
  .map(
    (repo) =>
      `  '${repo}': { commits: ${counts[repo].commits}, prs: ${counts[repo].prs} },`
  )
  .join('\n')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
writeFileSync(
  join(root, 'src/generated/repo-counts.ts'),
  `// GENERATED FILE — do not edit directly. Run \`pnpm gen:counts\`.

type RepoCounts = { commits: number; prs: number }

/**
 * Each project repo's total commits and pull requests, refreshed weekly.
 *
 * Typed as possibly absent because a lookup can miss: a repo \`pnpm gen:counts\`
 * has never read — a private one before its token is configured — has no entry.
 */
export const REPO_COUNTS: Record<string, RepoCounts | undefined> = {
${entries}
}
`
)
console.log(`wrote counts for ${Object.keys(counts).length} repos`)

const missing = PROJECT_REPOS.filter((repo) => !counts[repo])
for (const line of failed) {
  console.warn(`::warning::${line}`)
}
if (failed.length > 0) {
  console.error(
    `::error::${failed.length} repo(s) could not be read${missing.length > 0 ? `; no committed counts exist for ${missing.join(', ')}` : ', keeping the counts already committed'}`
  )
  process.exit(1)
}
