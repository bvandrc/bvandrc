import type { ComponentChildren } from 'preact'

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

/**
 * A subsection title, flanked by its icon on each side.
 *
 * `heading` wraps it in an `<h3>`, which is what gives a plain-text title its
 * size and an emoji flank the same. A title that carries its own size has no
 * use for one, and inside a table cell the heading's margins are not wanted.
 */
export const SectionTitle = ({
  id,
  icon,
  title,
  heading = true,
}: {
  id?: string
  icon: string | SectionLogo
  title: ComponentChildren
  heading?: boolean
}) => {
  const mark = <SectionIcon icon={icon} height={TITLE_LOGO_HEIGHT} />
  // GitHub links an unwrapped README image to its own camo URL, so a logo
  // links back to this heading instead.
  const flank =
    typeof icon === 'string' ? mark : <a href={id && `#${id}`}>{mark}</a>
  const line = (
    <>
      {flank}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{flank}
    </>
  )
  return heading ? <h3 id={id}>{line}</h3> : line
}

/**
 * A section title drawn as a badge rather than set as heading text.
 *
 * Heading text is near-black on one theme and near-white on the other, which
 * one image cannot be — so it ships both and lets the reader's browser pick,
 * which GitHub's sanitizer allows for exactly this.
 *
 * `<sub>` drops it onto the emoji's line. An image aligns by its bottom edge,
 * which puts it on the baseline, while a badge centres its text in its box —
 * so a 24px badge sets its text 12px above the baseline against the emoji's
 * 6px, and the two sit 6px apart. The box cannot be made shorter, since 24 is
 * the least that holds 20px text without the edges cutting its descenders,
 * and the emoji cannot be made larger without the heading this no longer has.
 * Lowering the badge is what is left, and it closes the gap to under 2px.
 */
export const HeadingBadge = ({ title }: { title: string }) => {
  const src = (color: string) =>
    badgeSrc({
      items: [{ value: title }],
      color,
      height: HEADING_BADGE_HEIGHT,
      bold: true,
      font: 'arial',
      fontSize: HEADING_FONT_SIZE,
    })
  return (
    <sub>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset={src(FG_DARK)} />
        <img src={src(FG_LIGHT)} height={HEADING_BADGE_HEIGHT} alt={title} />
      </picture>
    </sub>
  )
}
