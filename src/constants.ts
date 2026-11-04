export const ICON_GRAY = '8B949E'
export const BADGE_BG = '2f363d'

export type ProjectType = 'react' | 'npm' | 'github' | 'python' | 'arduino'

export const TYPE_ICONS: Record<
  ProjectType,
  {
    slug: string
    /** Tooltip shown on hover; also used as the img alt text for screen readers. */
    title: string
    /** Hex color overriding the icon's brand color, for brands that vanish on a light or dark theme. */
    color?: string
  }
> = {
  react: { slug: 'react', title: 'React' },
  npm: { slug: 'npm', title: 'npm (Typescript)' },
  // GitHub's brand color is near-black, invisible on dark theme
  github: { slug: 'github', title: 'GitHub Action', color: ICON_GRAY },
  python: { slug: 'python', title: 'Python' },
  arduino: { slug: 'arduino', title: 'Arduino' },
}
