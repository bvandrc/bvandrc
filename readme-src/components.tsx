export const ICON_GRAY = '8B949E'

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
