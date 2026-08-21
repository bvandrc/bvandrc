import { octiconLogo } from './utils'

export const ICON_GRAY = '8B949E'
export const BADGE_BG = '2f363d'

// GitHub octicon tinted to match the project icons, as a shields.io logo data URI
export const COMMIT_LOGO = octiconLogo('git-commit', ICON_GRAY)

export type ProjectType = 'react' | 'npm' | 'github' | 'python' | 'arduino'

export const TYPE_ICONS: Record<
  ProjectType,
  {
    slug: string
    /** Tooltip shown on hover; also used as the img alt text for screen readers. */
    title: string
  }
> = {
  react: { slug: 'react', title: 'React' },
  npm: { slug: 'npm', title: 'npm (Typescript)' },
  github: { slug: 'github', title: 'GitHub Action' },
  python: { slug: 'python', title: 'Python' },
  arduino: { slug: 'arduino', title: 'Arduino' },
}
