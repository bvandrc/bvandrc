export const ICON_GRAY = '8B949E'

/** The deployed worker that renders the count badges. */
export const WORKER_ORIGIN = 'https://multi-icon-badge.bvandrc.workers.dev'

/**
 * Icon and text fill for the count badges.
 *
 * The badges carry no background, so this has to supply its own contrast. A
 * mid grey reads on GitHub's light and dark themes alike, where the lighter
 * `ICON_GRAY` the project icons use would wash out against white.
 */
export const BADGE_FG = '6E7681'

/** Height of the type icons on a project's title line. */
export const TYPE_ICON_HEIGHT = 12

/**
 * Height of the count badge, whose padding is trimmed to nothing.
 *
 * The contents fill it rather than sitting inside it, so this is also the
 * icon height, and the text comes out a little under it — 9.43px here. 14
 * would give the renderer's full 11px, which is as large as the text gets
 * before the icons, always the taller of the two, make the badge grow.
 */
export const BADGE_HEIGHT = 12

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
