import type { BadgeItem, BadgeOptions } from 'badgesmith'
import { renderBadge } from 'badgesmith'

/** The deployed worker that renders every badge on a project's title line. */
const WORKER_ORIGIN = 'https://badgesmith.bvandrc.workers.dev'

/**
 * Height of every badge on a project's title line.
 *
 * One height for all of them is what aligns them: an `<img>` sits on the
 * line's baseline, and a badge centres its contents, so equal boxes put every
 * badge's contents on the same centre. What each one draws at is then its
 * `contentHeight`, not its height.
 *
 * The title sets its own text size, so this is no longer what makes a title
 * large — it is the room that text has to fit in, and the badges that pin a
 * `contentHeight` just take more padding as it grows.
 *
 * Which leaves the largest of those needs as the whole of it: 22 is the least
 * that holds the title's 18px of Arial, and the renderer refuses anything
 * tighter rather than let the edges cut the descenders. So a larger title is
 * what this has to grow for — nothing else on the line is near it.
 */
export const BADGE_HEIGHT = 22

/** Width of one `&nbsp;` in GitHub's README body font, in px. */
export const NBSP_WIDTH = 4.5

/**
 * Horizontal padding a badge leaves on each end of its contents, in px.
 *
 * Six at the renderer's base proportions, scaled by the size the contents are
 * drawn at, against the 14px an icon fills at that base. Derived rather than
 * measured so it follows whatever height a caller asks for.
 */
export const badgePad = (contentHeight: number) => (6 * contentHeight) / 14

/**
 * The `&nbsp;` that leave the gap `count` of them did around a bare image.
 *
 * A badge pads itself where an image did not, so the run beside one only has
 * to make up the difference — and a reader sees the gap the line always had.
 * Rounded to whole spaces, since a `&nbsp;` is the smallest gap the README can
 * express; `pad` alone can exceed the gap, which is what the floor is for.
 */
export const badgeGap = (count: number, pad: number) =>
  Math.max(0, Math.round((count * NBSP_WIDTH - pad) / NBSP_WIDTH))

export type BadgeParams = {
  items: BadgeItem[]
  /** icon and text fill, hex without the leading '#' */
  color: string
  /** draws each icon after its own value rather than before it */
  iconRight?: boolean
  /**
   * size the contents are drawn at within the badge, defaulting to the whole
   * of it; the rest becomes padding above and below
   */
  contentHeight?: number
  /**
   * The badge's own box, for one that does not sit on a project's title line.
   *
   * Everything on that line shares `BADGE_HEIGHT` so the badges centre
   * together; a heading has no such neighbours and sets its own.
   */
  height?: number
  /** draws the icons smaller against their values; 1 fills the height */
  iconScale?: number
  bold?: boolean
  underline?: boolean
  /**
   * Face the values are drawn in.
   *
   * Only the faces that are not the worker's own default, so leaving it off
   * is what asks for Verdana — and the badges that want Verdana keep the URLs
   * they already had.
   */
  font?: 'arial' | 'times' | 'courier'
  /**
   * Text size in px, independent of the badge's height.
   *
   * Without it the text is sized from the box, which ties how large it reads
   * to how tall the badge is — and the height is what badges align by.
   */
  fontSize?: number
}

/**
 * The renderer's options for a badge, which its URL and its measured width
 * are both built from.
 *
 * `color=none` leaves it with no background, so `color` has to carry its own
 * contrast against both GitHub themes. `padY` is always sent, even at zero:
 * the renderer sizes the contents against the icon box when it is given and
 * against the badge's full height when it is not, and only the first of those
 * makes `contentHeight` mean what it says.
 */
const badgeOptions = ({
  items,
  color,
  iconRight,
  height = BADGE_HEIGHT,
  contentHeight = height,
  iconScale,
  bold,
  underline,
  font,
  fontSize,
}: BadgeParams) =>
  ({
    items,
    color: 'none',
    iconColor: color,
    textColor: color,
    height,
    padY: (height - contentHeight) / 2,
    iconSide: iconRight ? 'right' : undefined,
    iconScale,
    bold,
    underline,
    font,
    fontSize,
  }) satisfies BadgeOptions

/** The URL of a badge, sized and styled like every other on the title line. */
export const badgeSrc = (params: BadgeParams) => {
  const { items, ...style } = badgeOptions(params)
  // the separators are the syntax, so only the values are escaped — a project
  // name carries spaces where a count or a slug never does. An icon with no
  // value keeps its colon, which is how the worker reads that form back
  const query = items
    .map(({ icon, value }) => {
      const escaped = value === undefined ? '' : encodeURIComponent(value)
      return icon === undefined ? escaped : `${icon}:${escaped}`
    })
    .join(',')
  // an unset option, or a flag left off, is the worker's default already
  const rest = Object.entries(style)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => `&${key}=${value}`)
    .join('')
  return `${WORKER_ORIGIN}/?items=${query}${rest}`
}

/**
 * Width a badge is drawn at, in px, as badgesmith's own renderer lays it out.
 *
 * Measured rather than modelled, so it holds whatever characters the values
 * use. It reads the npm package, which ships the worker's renderer, so a
 * width the worker changes reaches here when that package is bumped.
 */
export const badgeWidth = (params: BadgeParams) => {
  const width = renderBadge(badgeOptions(params)).match(
    /<svg[^>]*\swidth="([\d.]+)"/
  )?.[1]
  if (width === undefined) {
    throw new Error('badgesmith drew a badge with no width')
  }
  return Number(width)
}
