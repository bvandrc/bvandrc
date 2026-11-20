import { LINK_BLUE } from '../constants'
import { BADGE_HEIGHT, badgeSrc } from '../lib/badge'
import { ThemedBadge } from './ThemedBadge'

/**
 * What the badge reads.
 *
 * A folder, for the thing a repository is and a registry page is not — the
 * type icon beside this one points at npm, PyPI or the Actions marketplace,
 * so the two want telling apart. Not a glyph meaning "leaves the page": since
 * every link on the line opens in a new tab, marking one of them would say
 * the others do not.
 *
 * Three strokes, which is what survives at `REPO_CONTENT_HEIGHT` — a `code-square`
 * or a `package` fills in at this size.
 *
 * It leads the word, as the icons on the counts badge lead their own values.
 */
const ITEMS = [{ icon: 'file-directory', value: 'repo' }]

/**
 * Size the word and its folder are drawn at, inside `BADGE_HEIGHT`.
 *
 * A pixel over the counts badge beside it, which is what makes the word read
 * a little larger than the digits: 10.21px against their 9.43px. The rest of
 * the box is padding, so the two still centre on the same line.
 */
const REPO_CONTENT_HEIGHT = 13

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
 * `REPO_CONTENT_HEIGHT`, which the contents scale from — the padding around
 * them adds height, never width.
 */
export const REPO_BADGE_WIDTH = 48.26

/**
 * A badge reading "repo", matching the counts badge beside it.
 *
 * Carries no link of its own: the title line wraps this and everything
 * beside it in one anchor to the repository.
 */
export const RepoBadge = () => {
  const src = (color: string) =>
    badgeSrc({
      items: ITEMS,
      color,
      contentHeight: REPO_CONTENT_HEIGHT,
      iconScale: REPO_ICON_SCALE,
    })
  return (
    <ThemedBadge
      src={src(LINK_BLUE.DARK)}
      light={src(LINK_BLUE.LIGHT)}
      height={BADGE_HEIGHT}
      // the SVG's own aria-label is not exposed through an <img>, so this is
      // the badge's accessible name — the worker needs no say in it
      alt="GitHub Repository"
      title="GitHub Repository"
    />
  )
}
