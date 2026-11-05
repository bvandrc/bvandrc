/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Fill for a badge standing in for a link: GitHub's dark-theme link blue.
 *
 * GitHub picks one per theme and a plain `<img>` cannot, so this leans to the
 * theme worth getting right — 5.05:1 there against 3.75:1 on white. Sitting
 * between GitHub's two blues would read as a near miss where either of theirs
 * reads as deliberate, so it lands on one rather than splitting them.
 */
export const LINK_BLUE = '2f81f7'

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
