import { LINK_BLUE } from './constants'
import { badgeSrc } from './lib/badge'

/**
 * Height of a project title, which its text fills.
 *
 * GitHub renders README body text at 16px and offers no way to ask for more,
 * so a title drawn as a badge is the only way to size one: at 20 the word
 * comes out at 15.71px, a hair under the bold text it replaces, and the
 * height is the dial for making it larger.
 */
export const TITLE_BADGE_HEIGHT = 20

/**
 * Horizontal padding the renderer leaves on each end of a title, in px.
 *
 * Six at the renderer's base proportions, scaled by the size the contents are
 * drawn at — which with the padding trimmed is the whole height, against the
 * 14px an icon fills at that base. Derived rather than measured so it follows
 * `TITLE_BADGE_HEIGHT` wherever that is set.
 */
export const TITLE_BADGE_PAD = (6 * TITLE_BADGE_HEIGHT) / 14

/**
 * A project's name, drawn as a badge rather than set as text.
 *
 * Bold and underlined to match what GitHub makes of a link in bold body text
 * — the point of the substitution being the size, which real README text
 * cannot change. Carries no link of its own: the title line wraps it.
 */
export const TitleBadge = ({ name }: { name: string }) => (
  <img
    src={badgeSrc({
      items: [{ value: name }],
      color: LINK_BLUE,
      height: TITLE_BADGE_HEIGHT,
      bold: true,
      underline: true,
    })}
    height={TITLE_BADGE_HEIGHT}
    // the SVG's own aria-label is not exposed through an <img>, so the name
    // has to be repeated here to survive as text
    alt={name}
    title={name}
  />
)
