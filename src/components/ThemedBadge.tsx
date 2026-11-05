import type { JSX } from 'preact'

type ThemedBadgeProps = {
  /** the badge drawn in the light theme's colour */
  light: string
  /** the badge drawn in the dark theme's, and what a stripped `<picture>` leaves */
  src: string
  alt: string
} & Pick<JSX.ImgHTMLAttributes, 'height' | 'title'>

/**
 * A badge that follows the reader's theme, and degrades to one colour.
 *
 * `src` is the badge as it already was, and stays on the `<img>` — which is
 * what the dark theme gets, and what every reader would get if GitHub ever
 * stopped allowing `<picture>`. The light variant rides on the `<source>`, so
 * it is the addition that can be sanitized away rather than the colour the
 * whole README falls back to.
 *
 * The other way round reads more naturally, and is what the section headings
 * do, since a heading has no one colour to fall back to. A link does, so this
 * is arranged to keep it.
 */
export const ThemedBadge = ({ light, alt, ...img }: ThemedBadgeProps) => (
  <picture>
    <source media="(prefers-color-scheme: light)" srcset={light} />
    <img {...img} alt={alt} />
  </picture>
)
