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
  'SD': { commits: 631, prs: 81 },
  'TaskRankr': { commits: 669, prs: 589 },
  'arduino-totem': { commits: 36, prs: 5 },
  'badgesmith': { commits: 28, prs: 28 },
  'bike-ride-mapper': { commits: 88, prs: 38 },
  'detect-deploy': { commits: 17, prs: 22 },
  'glob-sort': { commits: 26, prs: 24, downloads: 1082 },
  'lighthouse-audit-utils': { commits: 25, prs: 27, downloads: 3403 },
  'lint-package-json': { commits: 7, prs: 3 },
  'mik-automator': { commits: 9, prs: 5, downloads: 328 },
  'persistent-logger': { commits: 19, prs: 18, downloads: 774 },
  'pr-diff-line-count': { commits: 30, prs: 34 },
  'react-component-test-suite': { commits: 22, prs: 22, downloads: 760 },
  'react-toolkit': { commits: 31, prs: 28, downloads: 1555 },
  'serato-tools': { commits: 370, prs: 78, downloads: 70988 },
  'serato-usb-export': { commits: 9, prs: 5, downloads: 5303 },
  'specialingredientbass.com': { commits: 97, prs: 56 },
  'tsx-to-pdf': { commits: 40, prs: 46, downloads: 2452 },
  'womanhoodofwubz.com': { commits: 52, prs: 45 },
}
