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
