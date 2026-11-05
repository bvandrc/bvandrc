/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Height of the type icons on a project's title line.
 *
 * Under `BADGE_HEIGHT` on purpose: a bare `<img>` cannot pad itself, so it
 * sits on the line's baseline rather than centring like the badges, and one
 * drawn to their full height would read heavier than the small print it
 * stands beside. Well under the row's height now that the titles are larger:
 * the icon marks what a project is, and at the badges' own size it would read
 * as loudly as the name it sits beside.
 */
export const TYPE_ICON_HEIGHT = 14
