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
 * Raising this grows the title, which fills it, and only pads the badges that
 * pin a `contentHeight` — so the row grows without the small print changing.
 */
export const BADGE_HEIGHT = 20

type BadgeItem = {
  /** simpleicons or octicon slug drawn beside the value; omitted for text alone */
  icon?: string
  value: string
}

type BadgeParams = {
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
 * The URL of a badge, sized and styled like every other on the title line.
 *
 * `color=none` leaves it with no background, so `color` has to carry its own
 * contrast against both GitHub themes. `padY` is always sent, even at zero:
 * the renderer sizes the contents against the icon box when it is given and
 * against the badge's full height when it is not, and only the first of those
 * makes `contentHeight` mean what it says.
 */
export const badgeSrc = ({
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
}: BadgeParams) => {
  // the separators are the syntax, so only the values are escaped — a project
  // name carries spaces where a count or a slug never does
  const query = items
    .map(({ icon, value }) => {
      const escaped = encodeURIComponent(value)
      return icon === undefined ? escaped : `${icon}:${escaped}`
    })
    .join(',')
  const padY = (height - contentHeight) / 2
  return `${WORKER_ORIGIN}/?items=${query}&color=none&iconColor=${color}&textColor=${color}&height=${height}&padY=${padY}${
    iconRight ? '&iconSide=right' : ''
  }${iconScale === undefined ? '' : `&iconScale=${iconScale}`}${
    bold ? '&bold=true' : ''
  }${underline ? '&underline=true' : ''}${font ? `&font=${font}` : ''}${
    fontSize === undefined ? '' : `&fontSize=${fontSize}`
  }`
}
