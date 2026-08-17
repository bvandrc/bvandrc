export const ICON_GRAY = '8B949E'

/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

export const SectionTitle = ({
  emoji,
  title,
}: {
  emoji: string
  title: string
}) => (
  <h3>
    {emoji}&nbsp;&nbsp;&nbsp; {title} &nbsp;&nbsp;&nbsp;{emoji}
  </h3>
)
