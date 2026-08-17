export type RepoCounts = { commits: number; prs: number }

const HEADERS: Record<string, string> = {
  'user-agent': 'bvandrc-readme-build',
  // raises the API rate limit in CI; unauthenticated builds still work
  ...(process.env.GITHUB_TOKEN && {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
}

/**
 * Fetches a repo's total commit and PR counts from the GitHub API, or null if
 * the API is unreachable (e.g. building offline) — callers should degrade.
 */
export const fetchRepoCounts = async (
  repo: string
): Promise<RepoCounts | null> => {
  // with per_page=1, the Link header's rel="last" page number equals the total count
  const total = async (path: string) => {
    const res = await fetch(
      `https://api.github.com/repos/bvandrc/${repo}/${path}`,
      { headers: HEADERS }
    )
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`)
    }
    const last = res.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)
    return last ? Number(last[1]) : ((await res.json()) as unknown[]).length
  }
  try {
    const [commits, prs] = await Promise.all([
      total('commits?per_page=1'),
      total('pulls?state=all&per_page=1'),
    ])
    return { commits, prs }
  } catch (error) {
    console.warn(`count fetch failed for ${repo}: ${error}`)
    return null
  }
}
