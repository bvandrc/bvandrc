import { COUNT_KINDS } from '../content/counts'
import { REPO_COUNTS } from '../generated/repo-counts'
import {
  BADGE_HEIGHT,
  type BadgeParams,
  badgeSrc,
  badgeWidth,
} from '../lib/badge'

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
 * Icon and text fill.
 *
 * A badge carries no background, so this has to supply its own contrast: a
 * mid grey reads on GitHub's light and dark themes alike, where the lighter
 * grey the project icons use would wash out against white.
 */
const BADGE_FG = '6E7681'

/**
 * A count as the badge shows it: in full below 1000, and to one decimal of a
 * thousand or million above (`70.3K`), leaving the exact number to its label.
 */
const formatCount = new Intl.NumberFormat(
  // fixed rather than the machine's, so every build writes the same README
  'en',
  { notation: 'compact', maximumFractionDigits: 1 }
).format

/**
 * `repo`'s counts in `COUNT_KINDS` order, each with its icon and noun: its
 * commits and PRs, then its downloads where it publishes a package.
 *
 * Empty for a repo that renders no badge.
 */
const shownCounts = (repo: string) => {
  const counts = REPO_COUNTS[repo]
  return COUNT_KINDS.flatMap(({ key, icon, noun }) => {
    const count = counts?.[key]
    return count === undefined ? [] : [{ icon, noun, count }]
  })
}

/** What `repo`'s badge is drawn from, or nothing for a repo that renders none. */
const countBadgeParams = (repo: string): BadgeParams | undefined => {
  const shown = shownCounts(repo)
  if (shown.length === 0) {
    return undefined
  }
  return {
    items: shown.map(({ icon, count }) => ({
      icon,
      value: formatCount(count),
    })),
    color: BADGE_FG,
    contentHeight: COUNT_CONTENT_HEIGHT,
  }
}

/**
 * Width the renderer lays `repo`'s badge out at, in px, or 0 for a repo that
 * renders none.
 */
export const countBadgeWidth = (repo: string) => {
  const params = countBadgeParams(repo)
  return params ? badgeWidth(params) : 0
}

/**
 * A project's commit and pull request totals, and its downloads where it
 * publishes a package, as one transparent badge.
 *
 * The numbers live in the URL rather than being looked up when the image
 * loads, which is what keeps `pnpm build` reproducible and the badge
 * identical for every reader — private repos included, since nothing has to
 * read the repo to render it. Its alt and hover text give each count in full.
 */
export const CountBadge = ({ repo }: CountBadgeProps) => {
  const params = countBadgeParams(repo)
  if (!params) {
    return null
  }
  const label = shownCounts(repo)
    .map(({ count, noun }) => `${count} ${count === 1 ? noun : `${noun}s`}`)
    .join(', ')
  return (
    <img
      src={badgeSrc(params)}
      height={BADGE_HEIGHT}
      alt={label}
      title={label}
    />
  )
}
