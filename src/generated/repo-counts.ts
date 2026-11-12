// GENERATED FILE — do not edit directly. Run `pnpm gen:counts`.

type RepoCounts = {
  commits: number
  prs: number
  /** All-time npm or PyPI downloads, for a project published to either */
  downloads?: number
}

/**
 * Each project repo's total commits and merged pull requests, and its npm or
 * PyPI package's all-time downloads where it has one, refreshed weekly.
 *
 * Typed as possibly absent because a lookup can miss: a repo `pnpm gen:counts`
 * has never read — a private one before its token is configured — has no entry.
 */
export const REPO_COUNTS: Record<string, RepoCounts | undefined> = {
  'SD': { commits: 683, prs: 135 },
  'TaskRankr': { commits: 670, prs: 590 },
  'arduino-totem': { commits: 36, prs: 5 },
  'badgesmith': { commits: 28, prs: 28 },
  'bike-ride-mapper': { commits: 90, prs: 40 },
  'detect-deploy': { commits: 18, prs: 23 },
  'glob-sort': { commits: 27, prs: 25, downloads: 1082 },
  'lighthouse-audit-utils': { commits: 26, prs: 28, downloads: 3655 },
  'lint-package-json': { commits: 7, prs: 3 },
  'mik-automator': { commits: 10, prs: 6, downloads: 367 },
  'persistent-logger': { commits: 19, prs: 18, downloads: 794 },
  'pr-diff-line-count': { commits: 31, prs: 35 },
  'react-component-test-suite': { commits: 23, prs: 23, downloads: 764 },
  'react-toolkit': { commits: 34, prs: 31, downloads: 2471 },
  'serato-tools': { commits: 382, prs: 90, downloads: 72376 },
  'serato-usb-export': { commits: 10, prs: 6, downloads: 5340 },
  'specialingredientbass.com': { commits: 100, prs: 59 },
  'tsx-to-pdf': { commits: 41, prs: 47, downloads: 2466 },
  'womanhoodofwubz.com': { commits: 54, prs: 47 },
}
