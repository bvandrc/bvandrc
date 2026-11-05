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
export const BADGE_HEIGHT = 18

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
  /** draws the icons smaller against their values; 1 fills the height */
  iconScale?: number
  bold?: boolean
  underline?: boolean
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
  contentHeight = BADGE_HEIGHT,
  iconScale,
  bold,
  underline,
}: BadgeParams) => {
  // the separators are the syntax, so only the values are escaped — a project
  // name carries spaces where a count or a slug never does
  const query = items
    .map(({ icon, value }) => {
      const escaped = encodeURIComponent(value)
      return icon === undefined ? escaped : `${icon}:${escaped}`
    })
    .join(',')
  const padY = (BADGE_HEIGHT - contentHeight) / 2
  return `${WORKER_ORIGIN}/?items=${query}&color=none&iconColor=${color}&textColor=${color}&height=${BADGE_HEIGHT}&padY=${padY}${
    iconRight ? '&iconSide=right' : ''
  }${iconScale === undefined ? '' : `&iconScale=${iconScale}`}${
    bold ? '&bold=true' : ''
  }${underline ? '&underline=true' : ''}`
}
