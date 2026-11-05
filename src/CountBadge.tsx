import { REPO_COUNTS } from './generated/repo-counts'

/** The deployed worker that renders the badges. */
const WORKER_ORIGIN = 'https://multi-icon-badge.bvandrc.workers.dev'

export type CountBadgeProps = {
  /** GitHub repo name under bvandrc, whose counts `pnpm gen:counts` committed */
  repo?: string
}

/**
 * How the renderer lays a badge out, in px, measured at `BADGE_HEIGHT`.
 *
 * Its width is this base plus one `digit` per character of the counts, which
 * holds exactly: the digits are fixed-width and nothing else in the badge
 * varies. Both move with `BADGE_HEIGHT`, which everything scales from.
 */
const BADGE_WIDTH = { base: 48.86, digit: 5.99 }

/**
 * The gap between a project's title and its type icon, in px.
 *
 * Four `&nbsp;` at 4.5px each, matching the markup in `Projects.tsx` — the
 * one measurement here that a change over there has to be mirrored in.
 */
const TITLE_GAP = 4 * 4.5

/**
 * Width of the blank image that counterweights `repo`'s badge, or 0 for a
 * repo that renders none.
 *
 * Balancing the title means matching everything to its right, where all but
 * the badge and the gap before the type icon cancels against the left. The
 * badge's width follows its digit count exactly, so this is computed per
 * project rather than estimated once — which centres every title instead of
 * only a project whose counts happen to be average.
 */
export const spacerWidth = (repo?: string) => {
  const counts = repo ? REPO_COUNTS[repo] : undefined
  if (!counts) {
    return 0
  }
  const digits = `${counts.commits}${counts.prs}`.length
  return Math.round(BADGE_WIDTH.base + BADGE_WIDTH.digit * digits + TITLE_GAP)
}

/**
 * Icon and text fill.
 *
 * A badge carries no background, so this has to supply its own contrast: a
 * mid grey reads on GitHub's light and dark themes alike, where the lighter
 * grey the project icons use would wash out against white.
 */
const BADGE_FG = '6E7681'

/**
 * Badge height, its padding trimmed to nothing.
 *
 * The contents fill it rather than sitting inside it, so this is also the
 * icon height, and the text comes out a little under it — 9.43px here. 14
 * would give the renderer's full 11px, which is as large as the text gets
 * before the icons, always the taller of the two, make the badge grow.
 */
const BADGE_HEIGHT = 12

/**
 * The appearance params, shared so every badge renders identically.
 *
 * `padY=0` trims the padding above and below the contents. The renderer
 * scales them to the room that leaves rather than to the height, so the text
 * comes out at its full 11px in a 14px box instead of shrinking with it.
 */
const STYLE = `color=none&iconColor=${BADGE_FG}&textColor=${BADGE_FG}&height=${BADGE_HEIGHT}&padY=0`

/**
 * A project's commit and pull request totals, as one transparent badge.
 *
 * The numbers live in the URL rather than being looked up when the image
 * loads, which is what keeps `pnpm build` reproducible and the badge
 * identical for every reader — private repos included, since nothing has to
 * read the repo to render it.
 */
export const CountBadge = ({ repo }: CountBadgeProps) => {
  const counts = repo ? REPO_COUNTS[repo] : undefined
  if (!counts) {
    return null
  }
  const label = `${counts.commits} commits, ${counts.prs} PRs`
  return (
    <a href={`https://github.com/bvandrc/${repo}`}>
      <img
        src={`${WORKER_ORIGIN}/?items=git-commit:${counts.commits},git-pull-request:${counts.prs}&${STYLE}`}
        height={BADGE_HEIGHT}
        alt={label}
        title={label}
      />
    </a>
  )
}
