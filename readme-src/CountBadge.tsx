import { BADGE_BG, COMMIT_LOGO } from './constants'
import { fetchRepoCounts, type RepoCounts } from './fetch-repo-counts'

export type CountBadgeProps = {
  /** GitHub repo name under bvandrc — its counts are fetched at build time */
  repo?: string
  /** counts for repos the GitHub API can't see (private) */
  counts?: RepoCounts
}

const liveCounts = new Map<string, RepoCounts | null>()

/**
 * Fetches counts for the given repos up front, so that CountBadge — which
 * renders synchronously — can put the real numbers in the badge.
 */
export const loadRepoCounts = async (repos: string[]) => {
  const fetched = await Promise.all(
    repos.map(async (repo) => [repo, await fetchRepoCounts(repo)] as const)
  )
  for (const [repo, counts] of fetched) {
    liveCounts.set(repo, counts)
  }
  const failed = fetched.filter(([, counts]) => !counts).map(([repo]) => repo)
  if (failed.length > 0 && process.env.CI) {
    throw new Error(
      `count fetch failed for ${failed.join(', ')} — refusing to generate a README with missing badges`
    )
  }
}

/** The counts a project's badge shows, or undefined when it has no badge. */
export const resolveCounts = ({ repo, counts }: CountBadgeProps) =>
  counts ?? (repo ? (liveCounts.get(repo) ?? undefined) : undefined)

/**
 * Commits and PRs in a single badge: GitHub pads every right-aligned image by
 * 20px, so separate images would always render with a gap between them.
 */
export const CountBadge = (props: CountBadgeProps) => {
  const counts = resolveCounts(props)
  if (!counts) return null
  // shields static-badge path: spaces are %20, literal dashes are doubled
  const path = encodeURIComponent(`${counts.commits} · ${counts.prs}`).replace(
    /-/g,
    '--'
  )
  return (
    <img
      align="right"
      src={`https://img.shields.io/badge/${path}-${BADGE_BG}?style=flat-square&logo=${COMMIT_LOGO}`}
      height="18"
      alt={`${counts.commits} commits · ${counts.prs} PRs`}
      title="commits and PRs"
    />
  )
}
