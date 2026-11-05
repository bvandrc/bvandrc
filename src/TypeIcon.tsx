import { ICON_GRAY } from './constants'
import type { ProjectType } from './content/project-types'
import { TYPE_ICONS } from './content/project-types'
import { BADGE_HEIGHT, badgePad, badgeSrc } from './lib/badge'

/**
 * Size the mark itself is drawn at, inside `BADGE_HEIGHT`.
 *
 * The rest of the box is padding, which is what centres it on the line: a
 * badge centres its contents, so every badge of the same height shares a
 * centre. Drawn as a bare `<img>` the mark could only sit on the baseline,
 * which left it below the badges either side of it.
 */
const TYPE_ICON_SIZE = 14

/**
 * Horizontal padding the renderer leaves at each end of the badge, in px.
 *
 * Which is to say six, while the mark is drawn at the size an icon fills at
 * the renderer's base proportions. The gaps either side subtract it, so a
 * reader sees the gap the markup asks for rather than that plus this.
 */
export const TYPE_ICON_PAD = badgePad(TYPE_ICON_SIZE)

/**
 * Width the renderer lays one of these out at, in px.
 *
 * The same for every type: a simple-icons mark is drawn on a square, so each
 * is as wide as it is tall. The counterweight needs this, since the mark is
 * no longer mirrored by a transparent twin on the other side of the title.
 */
export const TYPE_ICON_WIDTH = TYPE_ICON_SIZE + 2 * TYPE_ICON_PAD

/**
 * A project's type, as the brand's own mark.
 *
 * A badge rather than the image it used to be, so it centres with the badges
 * beside it. Carries no link of its own: the title line wraps it.
 */
export const TypeIcon = ({ type }: { type: ProjectType }) => {
  const { slug, title } = TYPE_ICONS[type]
  return (
    <img
      src={badgeSrc({
        items: [{ icon: slug }],
        color: ICON_GRAY,
        contentHeight: TYPE_ICON_SIZE,
      })}
      height={BADGE_HEIGHT}
      alt={title}
      title={title}
    />
  )
}
