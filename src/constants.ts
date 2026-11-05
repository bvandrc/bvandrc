/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

/**
 * Fill for a mark pitched at the dark canvas that may still land on white.
 *
 * GitHub's own muted foreground there, so it reads as a deliberate step down
 * from the text beside it rather than a washed-out version of it: 6.15:1 on
 * the dark canvas. It is the weaker of the two on white, at 3.08:1, which
 * still clears the bar for a mark or for text at a heading's size — the
 * counts badge, whose digits are far smaller, takes a darker grey instead.
 */
export const MUTED_GRAY = '8B949E'

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
