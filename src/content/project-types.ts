export type ProjectTypeIcon = {
  /** simpleicons.org slug */
  slug: string
  /** Tooltip shown on hover; also used as the img alt text for screen readers. */
  title: string
  /**
   * Whether this type publishes somewhere of its own — npm, PyPI, the Actions
   * marketplace — which is what a project of this type links to.
   *
   * Its icon points there when it does, since that page is the type's home,
   * and at the repository when it does not.
   */
  published: boolean
}

export const TYPE_ICONS = {
  react: { slug: 'react', title: 'React', published: false },
  npm: { slug: 'npm', title: 'npm', published: true },
  github: { slug: 'github', title: 'GitHub Action', published: true },
  worker: {
    slug: 'cloudflareworkers',
    title: 'Cloudflare Worker',
    published: true,
  },
  python: { slug: 'python', title: 'Python', published: true },
  arduino: { slug: 'arduino', title: 'Arduino', published: false },
} satisfies Record<string, ProjectTypeIcon>

/** Every kind of project, one per entry in `TYPE_ICONS`. */
export type ProjectType = keyof typeof TYPE_ICONS
