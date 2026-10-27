type SectionHeadingProps = {
  emoji: string
  title: string
}

/** A `##` section heading, with the emoji + nbsp spacing applied. */
export const SectionHeader = ({ emoji, title }: SectionHeadingProps) => (
  <h2>
    {emoji}&nbsp; {title} &nbsp;{emoji}
  </h2>
)

export const SectionTitle = ({ emoji, title }: SectionHeadingProps) => (
  <h3>
    {emoji}&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;&nbsp;&nbsp;&nbsp;{emoji}
  </h3>
)
