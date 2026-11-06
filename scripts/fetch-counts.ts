import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PROJECT_REPOS, PROJECTS } from '../src/content/projects'

/**
 * Rewrites `src/generated/repo-counts.ts` from the GitHub and npm APIs.
 *
 * Deliberately not part of `pnpm build`: the build has to render the same
 * README from the same source for CI to diff it, while these numbers change
 * on their own. The weekly workflow runs this first, then the build, and
 * commits both.
 *
 * Reads `GITHUB_TOKEN`. Any token raises the rate limit and reaches public
 * repos; private ones additionally need that token to be granted them. npm's
 * download counts need no token.
 *
 * Exits non-zero if any repo could not be read, having first written every
 * count it did get. A repo that fails keeps the numbers already committed,
 * so a dead token leaves the README stale rather than wrong.
 */

type RepoCounts = { commits: number; prs: number; downloads?: number }

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

/** The first day npm's download counts cover. */
const NPM_STATS_START = '2015-01-10'

/** Days per downloads query, inside the 18 months the API answers at once. */
const NPM_WINDOW_DAYS = 365

const DAY_MS = 24 * 60 * 60 * 1000

const isoDate = (time: number) => new Date(time).toISOString().slice(0, 10)

/** A JSON response from `url`, throwing on any non-2xx status. */
const fetchJson = async <T>(url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`${res.status} for ${url}`)
  }
  return (await res.json()) as T
}

/** An npm package's downloads from its first publish through today. */
const fetchDownloads = async (pkg: string) => {
  // a scoped name's slash would otherwise read as a path segment
  const name = pkg.replace('/', '%2F')
  const { time } = await fetchJson<{ time: { created: string } }>(
    `https://registry.npmjs.org/${name}`
  )
  const today = Date.now()
  let downloads = 0
  // the API caps each query's range, so an older package takes several
  for (
    let start = Math.max(Date.parse(time.created), Date.parse(NPM_STATS_START));
    start <= today;
    start += NPM_WINDOW_DAYS * DAY_MS
  ) {
    const end = Math.min(start + (NPM_WINDOW_DAYS - 1) * DAY_MS, today)
    const range = `${isoDate(start)}:${isoDate(end)}`
    downloads += (
      await fetchJson<{ downloads: number }>(
        `https://api.npmjs.org/downloads/point/${range}/${name}`
      )
    ).downloads
  }
  return downloads
}

const fetchCounts = async (
  repo: string,
  npmPackage: string | undefined
): Promise<RepoCounts> => {
  const base = `https://api.github.com/repos/${OWNER}/${repo}`
  const [commits, prs, downloads] = await Promise.all([
    total(`${base}/commits?per_page=1`),
    total(`${base}/pulls?state=all&per_page=1`),
    npmPackage === undefined ? undefined : fetchDownloads(npmPackage),
  ])
  return downloads === undefined
    ? { commits, prs }
    : { commits, prs, downloads }
}

const previous: Record<string, RepoCounts | undefined> = await import(
  '../src/generated/repo-counts'
)
  .then((module) => module.REPO_COUNTS)
  .catch(() => ({}))

const counts: Record<string, RepoCounts> = {}
const failed: string[] = []

for (const { repo, npmPackage } of PROJECTS.flatMap(
  ({ projects }) => projects
)) {
  try {
    counts[repo] = await fetchCounts(repo, npmPackage)
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
  .map((repo) => {
    const { commits, prs, downloads } = counts[repo]
    const fields = [`commits: ${commits}`, `prs: ${prs}`]
    if (downloads !== undefined) {
      fields.push(`downloads: ${downloads}`)
    }
    return `  '${repo}': { ${fields.join(', ')} },`
  })
  .join('\n')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
writeFileSync(
  join(root, 'src/generated/repo-counts.ts'),
  `// GENERATED FILE — do not edit directly. Run \`pnpm gen:counts\`.

type RepoCounts = {
  commits: number
  prs: number
  /** All-time npm downloads, for a project published there */
  downloads?: number
}

/**
 * Each project repo's total commits and pull requests, and its npm package's
 * all-time downloads where it has one, refreshed weekly.
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
