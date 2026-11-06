import { FULL_LINE_WIDTH, LINK_BLUE } from '../constants'
import { BADGE_HEIGHT, badgePad, badgeSrc } from '../lib/badge'
import { ThemedBadge } from './ThemedBadge'

/**
 * Face a title is drawn in.
 *
 * The nearest thing to what GitHub sets the README in: its stack falls to
 * Helvetica and then Arial once the three system faces miss, so this is the
 * same place a reader without any of them already lands. The system faces
 * themselves are not on offer — they differ per platform, so no single table
 * could size the badge for all of them.
 *
 * Narrower than Verdana at the same size, which tightens the titles.
 */
const TITLE_FONT = 'arial'

/**
 * Size a title's text is drawn at.
 *
 * Set apart from `BADGE_HEIGHT`, which only has to leave room for it: the box
 * is what the badges on the line are measured and aligned by, and tying the
 * text to it would mean a larger title could only come from a larger box.
 *
 * Under the 20 a section heading uses, so the two still read as a hierarchy.
 */
const TITLE_FONT_SIZE = 18

/**
 * Horizontal padding the renderer leaves on each end of a title, in px.
 *
 * A title's contents are the whole badge, so the pad follows `BADGE_HEIGHT`
 * wherever that is set.
 */
export const TITLE_BADGE_PAD = badgePad(BADGE_HEIGHT)

/**
 * A project's name, drawn as a badge rather than set as text.
 *
 * Bold and underlined to match what GitHub makes of a link in bold body text
 * — the point of the substitution being the size, which real README text
 * cannot change. It fills `BADGE_HEIGHT` rather than padding into it, so that
 * constant is the dial for how large a title reads. Carries no link of its
 * own: the title line wraps it, and takes `href` only to name it on hover.
 */
export const TitleBadge = ({ name, href }: { name: string; href: string }) => {
  const src = (color: string) =>
    badgeSrc({
      items: [{ value: name }],
      color,
      bold: true,
      underline: true,
      font: TITLE_FONT,
      fontSize: TITLE_FONT_SIZE,
    })
  return (
    <ThemedBadge
      src={src(LINK_BLUE.DARK)}
      light={src(LINK_BLUE.LIGHT)}
      height={BADGE_HEIGHT}
      // a narrow viewport gives the title a line to itself, with the rest of
      // its line wrapping beneath it. The SVG keeps its proportions in the
      // wider box, so the name stays its size and centres in the line
      narrowWidth={FULL_LINE_WIDTH}
      // the SVG's own aria-label is not exposed through an <img>, so the name
      // has to be repeated here to survive as text
      alt={name}
      // a badge is an image, so a browser shows no status-bar preview of where
      // the link around it goes — the tooltip is the only place the
      // destination can appear, and it says more than the name it draws
      title={href}
    />
  )
}
