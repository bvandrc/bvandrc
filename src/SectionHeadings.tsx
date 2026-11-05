import type { SectionLogo } from './content/types'

/** Height of a section logo in an `<h3>` title, matching its emoji. */
const TITLE_LOGO_HEIGHT = 20

/** Height of a section logo on the contents line, matching body text. */
const CONTENTS_LOGO_HEIGHT = 16

/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

/** A section's logo in its brand colour, or its emoji when it has none. */
export const SectionMark = ({
  emoji,
  logo,
  height = CONTENTS_LOGO_HEIGHT,
}: {
  emoji: string
  logo?: SectionLogo
  height?: number
}) =>
  logo ? (
    <img
      src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
      height={height}
      alt={emoji}
    />
  ) : (
    emoji
  )

/** An `<h3>` subsection title, flanked by its emoji (or logo) doubled on each side. */
export const SectionTitle = ({
  id,
  emoji,
  logo,
  title,
}: {
  id?: string
  emoji: string
  logo?: SectionLogo
  title: string
}) => {
  const mark = (
    <SectionMark emoji={emoji} logo={logo} height={TITLE_LOGO_HEIGHT} />
  )
  // GitHub links an unwrapped README image to its own camo URL, so a logo
  // pair links back to this heading instead. A space keeps the pair apart,
  // where two emoji carry their own side bearing.
  const pair = logo ? (
    <a href={id && `#${id}`}>
      {mark}&nbsp;{mark}
    </a>
  ) : (
    // one string, since the pretty-printer would break two text nodes apart
    emoji.repeat(2)
  )
  return (
    <h3 id={id}>
      {pair}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{pair}
    </h3>
  )
}
