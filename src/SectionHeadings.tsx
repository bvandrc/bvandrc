import type { SectionLogo } from './content/types'

/** Height of a section logo in an `<h3>` title, matching its emoji. */
const TITLE_LOGO_HEIGHT = 20

/** Height of a section logo on the contents line, matching body text. */
const CONTENTS_LOGO_HEIGHT = 16

/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

/** A section's emoji, or its logo in its brand colour. */
export const SectionMark = ({
  emoji,
  height = CONTENTS_LOGO_HEIGHT,
}: {
  emoji: string | SectionLogo
  height?: number
}) =>
  typeof emoji === 'string' ? (
    emoji
  ) : (
    // decorative: the section's title always sits beside it
    <img
      src={`https://cdn.simpleicons.org/${emoji.slug}/${emoji.color}`}
      height={height}
      alt=""
    />
  )

/** An `<h3>` subsection title, flanked by its emoji (or logo) on each side. */
export const SectionTitle = ({
  id,
  emoji,
  title,
}: {
  id?: string
  emoji: string | SectionLogo
  title: string
}) => {
  const mark = <SectionMark emoji={emoji} height={TITLE_LOGO_HEIGHT} />
  // GitHub links an unwrapped README image to its own camo URL, so a logo
  // links back to this heading instead.
  const flank =
    typeof emoji === 'string' ? mark : <a href={id && `#${id}`}>{mark}</a>
  return (
    <h3 id={id}>
      {flank}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{flank}
    </h3>
  )
}
