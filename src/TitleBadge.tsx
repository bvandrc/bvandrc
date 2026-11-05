import { BADGE_HEIGHT, badgeSrc } from './lib/badge'

/**
 * Text fill: GitHub's own link blue, so the title reads as the link it is.
 *
 * GitHub picks a blue per theme and a badge cannot, so this is the light
 * one — 5.19:1 on white, and 3.64:1 on GitHub's dark surface, which is under
 * the 4.5:1 a muted blue would hold on both. The title is the one place on
 * the line worth spending that on: it is what a reader is looking for, and a
 * blue that is nearly GitHub's reads as a mistake where GitHub's own does
 * not. The repo badge keeps the muted blue for exactly the opposite reason.
 */
const TITLE_BLUE = '0969da'

/**
 * Horizontal padding the renderer leaves on each end of a title, in px.
 *
 * Six at the renderer's base proportions, scaled by the size the contents are
 * drawn at — which for a title is the whole badge, against the 14px an icon
 * fills at that base. Derived rather than measured so it follows
 * `BADGE_HEIGHT` wherever that is set.
 */
export const TITLE_BADGE_PAD = (6 * BADGE_HEIGHT) / 14

/**
 * A project's name, drawn as a badge rather than set as text.
 *
 * Bold and underlined to match what GitHub makes of a link in bold body text
 * — the point of the substitution being the size, which real README text
 * cannot change. It fills `BADGE_HEIGHT` rather than padding into it, so that
 * constant is the dial for how large a title reads. Carries no link of its
 * own: the title line wraps it.
 */
export const TitleBadge = ({ name }: { name: string }) => (
  <img
    src={badgeSrc({
      items: [{ value: name }],
      color: TITLE_BLUE,
      bold: true,
      underline: true,
    })}
    height={BADGE_HEIGHT}
    // the SVG's own aria-label is not exposed through an <img>, so the name
    // has to be repeated here to survive as text
    alt={name}
    title={name}
  />
)
