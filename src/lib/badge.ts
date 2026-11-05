/** The deployed worker that renders every badge on a project's title line. */
const WORKER_ORIGIN = 'https://badgesmith.bvandrc.workers.dev'

/**
 * Height of every badge, its padding trimmed to nothing.
 *
 * The contents fill it rather than sitting inside it, so this is also the
 * icon height, and the text comes out a little under it — 9.43px here.
 */
export const BADGE_HEIGHT = 12

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
  /** overrides the shared height, and with it the size of the contents */
  height?: number
  /** draws the icons smaller against their values; 1 fills the height */
  iconScale?: number
  bold?: boolean
  underline?: boolean
}

/**
 * The URL of a badge, sized and styled like every other on the title line.
 *
 * `color=none` leaves it with no background, so `color` has to carry its own
 * contrast against both GitHub themes, and `padY=0` trims the padding so the
 * text keeps its size in a box this short.
 */
export const badgeSrc = ({
  items,
  color,
  iconRight,
  height = BADGE_HEIGHT,
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
  return `${WORKER_ORIGIN}/?items=${query}&color=none&iconColor=${color}&textColor=${color}&height=${height}&padY=0${
    iconRight ? '&iconSide=right' : ''
  }${iconScale === undefined ? '' : `&iconScale=${iconScale}`}${
    bold ? '&bold=true' : ''
  }${underline ? '&underline=true' : ''}`
}
