/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Viewports that get the narrow layout: a title on a line of its own, and no
 * counterweight to centre it.
 *
 * Phones, which GitHub stacks into a single column, and the widths where its
 * sidebar leaves the README column narrower than the widest title line plus
 * its counterweight. That line, react-component-test-suite's, first wraps
 * at about 1150px; 1200 leaves a little margin over it, so a slightly longer
 * name doesn't wrap on its own while the rest stay on one line.
 */
export const NARROW_VIEWPORT = '(max-width: 1199px)'

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
