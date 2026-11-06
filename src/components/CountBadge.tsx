import { REPO_COUNTS } from '../generated/repo-counts'
import type { BadgeParams } from '../lib/badge'
import { BADGE_HEIGHT, badgeSrc, badgeWidth } from '../lib/badge'

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
 * What `repo`'s badge is drawn from: its commits and PRs, then its downloads
 * where it publishes a package, or nothing for a repo that renders no badge.
 */
const countBadgeParams = (repo: string): BadgeParams | undefined => {
  const counts = REPO_COUNTS[repo]
  if (!counts) {
    return undefined
  }
  const items = [
    { icon: 'git-commit', value: formatCount(counts.commits) },
    { icon: 'git-pull-request', value: formatCount(counts.prs) },
  ]
  if (counts.downloads !== undefined) {
    items.push({ icon: 'download', value: formatCount(counts.downloads) })
  }
  return { items, color: BADGE_FG, contentHeight: COUNT_CONTENT_HEIGHT }
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
  const counts = REPO_COUNTS[repo]
  const params = countBadgeParams(repo)
  if (!(counts && params)) {
    return null
  }
  const label = `${counts.commits} commits, ${counts.prs} PRs${
    counts.downloads === undefined ? '' : `, ${counts.downloads} downloads`
  }`
  return (
    <img
      src={badgeSrc(params)}
      height={BADGE_HEIGHT}
      alt={label}
      title={label}
    />
  )
}
