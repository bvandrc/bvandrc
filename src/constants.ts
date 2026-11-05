export const ICON_GRAY = '8B949E'

/** Height of the type icons on a project's title line. */
export const TYPE_ICON_HEIGHT = 12

export type ProjectType = 'react' | 'npm' | 'github' | 'python' | 'arduino'

type ProjectTypeIcon = {
  /** simpleicons.org slug */
  slug: string
  /** Tooltip shown on hover; also used as the img alt text for screen readers. */
  title: string
}

export const TYPE_ICONS = {
  react: { slug: 'react', title: 'React' },
  npm: { slug: 'npm', title: 'npm (Typescript)' },
  github: { slug: 'github', title: 'GitHub Action' },
  python: { slug: 'python', title: 'Python' },
  arduino: { slug: 'arduino', title: 'Arduino' },
} satisfies Record<ProjectType, ProjectTypeIcon>
