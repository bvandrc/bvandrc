/** The deployed worker that renders every badge on a project's title line. */
const WORKER_ORIGIN = 'https://multi-icon-badge.bvandrc.workers.dev'

/**
 * Height of every badge, its padding trimmed to nothing.
 *
 * The contents fill it rather than sitting inside it, so this is also the
 * icon height, and the text comes out a little under it — 9.43px here.
 */
export const BADGE_HEIGHT = 12

type BadgeParams = {
  /** comma-separated `icon:value` pairs */
  items: string
  /** icon and text fill, hex without the leading '#' */
  color: string
  /** draws each icon after its own value rather than before it */
  iconRight?: boolean
  /** overrides the shared height, and with it the size of the contents */
  height?: number
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
}: BadgeParams) =>
  `${WORKER_ORIGIN}/?items=${items}&color=none&iconColor=${color}&textColor=${color}&height=${height}&padY=0${
    iconRight ? '&iconSide=right' : ''
  }`
