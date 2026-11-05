/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Height of the type icons on a project's title line.
 *
 * Under `BADGE_HEIGHT` on purpose: a bare `<img>` cannot pad itself, so it
 * sits on the line's baseline rather than centring like the badges, and one
 * drawn to their full height would read heavier than the small print it
 * stands beside. Kept to the same share of the row's height, so it holds its
 * place against the badges wherever that is set.
 */
export const TYPE_ICON_HEIGHT = 17
