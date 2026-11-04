/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

/** An `<h3>` subsection title, flanked by its emoji doubled on each side. */
export const SectionTitle = ({
  id,
  emoji,
  title,
}: {
  id?: string
  emoji: string
  title: string
}) => (
  <h3 id={id}>
    {emoji}
    {emoji}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{emoji}
    {emoji}
  </h3>
)
