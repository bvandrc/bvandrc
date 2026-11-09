/** A repo's counts, keyed by `CountKind`'s `key`. */
type Counts = Partial<Record<string, number>>

/**
 * One of the counts a project's badge shows, and bvandercar.dev's project cards.
 *
 * `key` names its entry in `src/generated/repo-counts.ts`. `icon` is an
 * Octicons name, which badgesmith draws here, and which Lucide also answers to
 * on bvandercar.dev. `noun` is what one of it is called. `isShown`, where set,
 * decides from a repo's counts whether it shows this one.
 */
export type CountKind = {
  key: string
  icon: string
  noun: string
  isShown?: (counts: Counts) => boolean
}

/** How high a repo's PRs must score to show beside its commits. */
const PR_SCORE_MIN = 100

/**
 * Whether a repo's merged PRs show beside its commits: where there are many,
 * and most of its commits came through them.
 *
 * Its score is its PRs times the share of its commits they make up, capped at
 * all of them, so it takes 100 PRs that are every commit to reach 100, or
 * 200 that are half. Every PR is squash-merged, so with fewer, or with most
 * commits pushed directly, the PR count is the commit count again, or
 * undersells the work.
 */
const showsPrs = ({ commits = 0, prs = 0 }: Counts) =>
  prs * Math.min(prs / commits, 1) >= PR_SCORE_MIN

/** A project's counts, in the order its badge shows them. */
export const COUNT_KINDS = [
  { key: 'commits', icon: 'git-commit', noun: 'commit' },
  { key: 'prs', icon: 'git-pull-request', noun: 'PR', isShown: showsPrs },
  { key: 'downloads', icon: 'download', noun: 'download' },
] as const satisfies readonly CountKind[]

/** The kinds of count a repo's counts show, in order: each it has, where it shows. */
export const getShownCountKinds = (counts: Counts | undefined) =>
  COUNT_KINDS.filter(
    (kind: CountKind) =>
      counts?.[kind.key] !== undefined && (kind.isShown?.(counts) ?? true)
  )
