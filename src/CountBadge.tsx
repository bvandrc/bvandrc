import { REPO_COUNTS } from './generated/repo-counts'
import { BADGE_HEIGHT, badgeSrc } from './lib/badge'

/**
 * Size the digits and their icons are drawn at, inside `BADGE_HEIGHT`.
 *
 * The rest of the box is padding, which is what keeps the counts the size
 * they have always been while the badge grew to match the title beside it.
 */
const COUNT_CONTENT_HEIGHT = 12

export type CountBadgeProps = {
  /** GitHub repo name under bvandrc, whose counts `pnpm gen:counts` committed */
  repo: string
}

/**
 * How the renderer lays a badge out, in px, measured at
 * `COUNT_CONTENT_HEIGHT`.
 *
 * Its width is this base plus one `digit` per character of the counts, which
 * holds exactly: the digits are fixed-width and nothing else in the badge
 * varies. Both move with `COUNT_CONTENT_HEIGHT`, which the contents scale
 * from — the padding around them adds height, never width.
 */
const BADGE_WIDTH = { base: 48.86, digit: 5.99 }

/**
 * Width the renderer lays `repo`'s badge out at, in px, or 0 for a repo that
 * renders none.
 *
 * Its width is the base plus one `digit` per character of the counts, which
 * holds exactly: the digits are fixed-width and nothing else in the badge
 * varies.
 */
export const countBadgeWidth = (repo: string) => {
  const counts = REPO_COUNTS[repo]
  if (!counts) {
    return 0
  }
  const digits = `${counts.commits}${counts.prs}`.length
  return BADGE_WIDTH.base + BADGE_WIDTH.digit * digits
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
 * A project's commit and pull request totals, as one transparent badge.
 *
 * The numbers live in the URL rather than being looked up when the image
 * loads, which is what keeps `pnpm build` reproducible and the badge
 * identical for every reader — private repos included, since nothing has to
 * read the repo to render it.
 */
export const CountBadge = ({ repo }: CountBadgeProps) => {
  const counts = REPO_COUNTS[repo]
  if (!counts) {
    return null
  }
  const label = `${counts.commits} commits, ${counts.prs} PRs`
  return (
    <img
      src={badgeSrc({
        items: [
          { icon: 'git-commit', value: `${counts.commits}` },
          { icon: 'git-pull-request', value: `${counts.prs}` },
        ],
        color: BADGE_FG,
        contentHeight: COUNT_CONTENT_HEIGHT,
      })}
      height={BADGE_HEIGHT}
      alt={label}
      title={label}
    />
  )
}
