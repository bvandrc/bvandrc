/** One of my repos on GitHub. */
export const repoUrl = (repo: string) => `https://github.com/bvandrc/${repo}`

export const ICON_GRAY = '8B949E'

/**
 * Fill for a mark that has to read on whichever canvas it lands on.
 *
 * A badge carries no background, so it supplies its own contrast — and some
 * of them cannot know which background that is. GitHub themes a page with its
 * own attributes while `<picture>` matches on `prefers-color-scheme`, which
 * follows the reader's OS, so the two disagree for anyone who pins GitHub's
 * theme against their system. A variant that could land on either canvas has
 * to clear both: 4.59:1 on white and 4.12:1 on the dark canvas, where the
 * lighter grey the project icons use would wash out against white.
 */
export const BOTH_THEME_GRAY = '6E7681'

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
