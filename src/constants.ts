/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Text fill for a badge standing in for a link: blue enough to read as one,
 * muted so the repo badge does not compete with the title above it.
 *
 * GitHub's own link blues are picked per theme, which a badge cannot do, and
 * both are more saturated than this. Desaturating costs nothing here — at
 * 4.5:1 on white and 4.2:1 on GitHub's dark surface it still carries the
 * contrast it has to, having no background of its own to sit on.
 */
export const LINK_BLUE = '4d79b2'

/** Height of the type icons on a project's title line. */
export const TYPE_ICON_HEIGHT = 12
