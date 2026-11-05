import type { SectionLogo } from './content/projects'
import { badgeSrc } from './lib/badge'

/** GitHub's own body text colours, which a heading is set in. */
const FG_LIGHT = '1f2328'
const FG_DARK = 'f0f6fc'

/**
 * Box a section title is drawn in, and the size of the text inside it.
 *
 * The box is what the badge is measured and aligned by; the text size is set
 * apart from it, so the title can read larger than a 24px box would otherwise
 * allow. 20 is just under what that box can hold before the edges would cut
 * the descenders, which the renderer refuses outright.
 */
const HEADING_BADGE_HEIGHT = 24
const HEADING_FONT_SIZE = 20

/** Height of a section logo in an `<h3>` title, matching an emoji's. */
const TITLE_LOGO_HEIGHT = 20

/** Height of a section logo on the contents line, matching body text. */
const CONTENTS_LOGO_HEIGHT = 16

/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

/** A section's emoji, or its logo in its brand colour. */
export const SectionIcon = ({
  icon,
  height = CONTENTS_LOGO_HEIGHT,
}: {
  icon: string | SectionLogo
  height?: number
}) =>
  typeof icon === 'string' ? (
    icon
  ) : (
    // decorative: the section's title always sits beside it
    <img
      src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
      height={height}
      alt=""
    />
  )

/** An `<h3>` subsection title, flanked by its icon on each side. */
export const SectionTitle = ({
  id,
  icon,
  title,
}: {
  id?: string
  icon: string | SectionLogo
  title: string
}) => {
  const mark = <SectionIcon icon={icon} height={TITLE_LOGO_HEIGHT} />
  // GitHub links an unwrapped README image to its own camo URL, so a logo
  // links back to this heading instead.
  const flank =
    typeof icon === 'string' ? mark : <a href={id && `#${id}`}>{mark}</a>
  return (
    <h3 id={id}>
      {flank}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{flank}
    </h3>
  )
}

/**
 * Gap between a section's emoji and its title, inside the badge.
 *
 * Four spaces come to 22.2px at this size. The emoji used to sit outside the
 * badge, where it was separated by `&nbsp;` runs *and* the badge's own end
 * padding; in here only the spaces are left to do it.
 *
 * The worker takes 32 characters in a value, and the longest of these headings
 * reaches 30 with this gap — a longer title or a wider gap needs that raised.
 */
const HEADING_GAP = '    '

/**
 * A section title drawn as a badge, emoji and all.
 *
 * Holding the emoji inside the badge is what keeps the two on one line. Drawn
 * beside it they could not be: an image aligns by its bottom edge while a
 * badge centres its text in its box, so the two sat 6px apart however they
 * were sized. In here the emoji is text like the rest, laid out by the same
 * renderer, and it takes the title's size rather than the size of whatever
 * element happens to surround it.
 *
 * Heading text is near-black on one theme and near-white on the other, which
 * one image cannot be — so it ships both and lets the reader's browser pick,
 * which GitHub's sanitizer allows for exactly this. The emoji is unaffected:
 * a reader's emoji font draws it in its own colours either way.
 */
export const HeadingBadge = ({
  icon,
  title,
}: {
  icon: string
  title: string
}) => {
  const src = (color: string) =>
    badgeSrc({
      items: [{ value: `${icon}${HEADING_GAP}${title}${HEADING_GAP}${icon}` }],
      color,
      height: HEADING_BADGE_HEIGHT,
      bold: true,
      font: 'arial',
      fontSize: HEADING_FONT_SIZE,
    })
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset={src(FG_DARK)} />
      {/* the emoji is decorative; the title is the heading */}
      <img src={src(FG_LIGHT)} height={HEADING_BADGE_HEIGHT} alt={title} />
    </picture>
  )
}
