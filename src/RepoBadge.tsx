import { repoUrl } from './constants'
import { BADGE_HEIGHT, badgeSrc } from './lib/badge'

/**
 * Text fill, a blue that reads as a link.
 *
 * GitHub's own link blues are picked per theme, which a badge cannot do, so
 * this is the one between them: 4.6:1 on white and 4.1:1 on GitHub's dark
 * surface, where the light theme's `0969da` thins out on dark and the dark
 * theme's `58a6ff` washes out on white.
 */
const LINK_BLUE = '1f6feb'

/** What the badge reads, with the icon drawn after it. */
const ITEMS = 'link-external:repo'

/**
 * Width the renderer lays this badge out at, in px.
 *
 * One constant rather than a measurement per project: every repo badge holds
 * the same text and icon, so they are all this wide. It moves with
 * `BADGE_HEIGHT`, which everything in the badge scales from.
 */
export const REPO_BADGE_WIDTH = 46.95

/** A link to the project's repo, as a badge matching the counts beside it. */
export const RepoBadge = ({ repo }: { repo: string }) => (
  <a href={repoUrl(repo)}>
    <img
      src={badgeSrc({ items: ITEMS, color: LINK_BLUE, iconRight: true })}
      height={BADGE_HEIGHT}
      alt="repo"
      title="repo"
    />
  </a>
)
