import { badgeSrc } from './lib/badge'

/**
 * Text and icon fill: blue enough to read as a link, muted so it does not
 * compete with the project title above it.
 *
 * GitHub's own link blues are picked per theme, which a badge cannot do, and
 * both are more saturated than this. Desaturating costs nothing here — at
 * 4.5:1 on white and 4.2:1 on GitHub's dark surface it still carries the
 * contrast it has to, having no background of its own to sit on.
 */
const LINK_BLUE = '4d79b2'

/**
 * What the badge reads.
 *
 * A folder, for the thing a repository is and a registry page is not — the
 * type icon beside this one points at npm, PyPI or the Actions marketplace,
 * so the two want telling apart. Not a glyph meaning "leaves the page": since
 * every link on the line opens in a new tab, marking one of them would say
 * the others do not.
 *
 * Three strokes, which is what survives at `BADGE_HEIGHT` — a `code-square`
 * or a `package` fills in at this size.
 *
 * It leads the word, as the icons on the counts badge lead their own values.
 */
const ITEMS = 'file-directory:repo'

/**
 * Height of this badge, a pixel over the counts badge beside it.
 *
 * Its contents scale from the height, so the extra pixel is what makes the
 * word read a little larger than the digits: 10.21px against their 9.43px.
 */
const REPO_BADGE_HEIGHT = 13

/**
 * How large the folder is against the word, as a fraction of the height.
 *
 * At 1 an icon fills the height the contents are given, which leaves it
 * taller than the text it sits beside. This brings it to about the weight of
 * the counts badge's own icons, which is what it sits next to.
 */
const REPO_ICON_SCALE = 0.8

/**
 * Width the renderer lays this badge out at, in px.
 *
 * One constant rather than a measurement per project: every repo badge holds
 * the same text and icon, so they are all this wide. It moves with
 * `REPO_BADGE_HEIGHT`, which everything in the badge scales from.
 */
export const REPO_BADGE_WIDTH = 48.26

/**
 * A badge reading "repo", matching the counts badge beside it.
 *
 * Carries no link of its own: the title line wraps this and everything
 * beside it in one anchor to the repository.
 */
export const RepoBadge = () => (
  <img
    src={badgeSrc({
      items: ITEMS,
      color: LINK_BLUE,
      height: REPO_BADGE_HEIGHT,
      iconScale: REPO_ICON_SCALE,
    })}
    height={REPO_BADGE_HEIGHT}
    // the SVG's own aria-label is not exposed through an <img>, so this is
    // the badge's accessible name — the worker needs no say in it
    alt="GitHub repository"
    title="GitHub repository"
  />
)
