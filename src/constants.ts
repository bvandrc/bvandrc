/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Viewports that get the narrow layout: a title on a line of its own, and no
 * counterweight to centre it.
 *
 * Below 768px GitHub stacks its profile into a single column, which leaves a
 * README too narrow for a title line plus its counterweight.
 */
export const NARROW_VIEWPORT = '(max-width: 767px)'

/**
 * Width an image asks for to fill exactly one line, in px.
 *
 * Wider than any README column, so GitHub's `max-width: 100%` on images
 * clamps it to the line, which leaves it nothing to share a line with.
 */
export const FULL_LINE_WIDTH = 2000

/**
 * Fill for a badge standing in for a link: GitHub's own accent, per theme.
 *
 * GitHub picks one of these per theme and a plain `<img>` cannot, so a badge
 * ships both and lets `<picture>` choose — 5.05:1 on the dark canvas and
 * 5.19:1 on white, where one blue for both left the light theme at 3.75:1.
 *
 * `DARK` is the one that was serving both, and the one a reader still gets if
 * `<picture>` is ever sanitized away, so the fallback is no worse than what
 * shipped before.
 */
export const LINK_BLUE = { DARK: '2f81f7', LIGHT: '0969da' }
