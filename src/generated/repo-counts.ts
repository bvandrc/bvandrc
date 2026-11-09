// GENERATED FILE — do not edit directly. Run `pnpm gen:counts`.

type RepoCounts = {
  commits: number
  prs: number
  /** All-time npm or PyPI downloads, for a project published to either */
  downloads?: number
}

/**
 * Each project repo's total commits and pull requests, and its npm or PyPI
 * package's all-time downloads where it has one, refreshed weekly.
 *
 * Typed as possibly absent because a lookup can miss: a repo `pnpm gen:counts`
 * has never read — a private one before its token is configured — has no entry.
 */
export const REPO_COUNTS: Record<string, RepoCounts | undefined> = {
  'SD': { commits: 574, prs: 37 },
  'TaskRankr': { commits: 667, prs: 658 },
  'arduino-totem': { commits: 36, prs: 7 },
  'badgesmith': { commits: 28, prs: 28 },
  'bike-ride-mapper': { commits: 88, prs: 45 },
  'detect-deploy': { commits: 17, prs: 25 },
  'glob-sort': { commits: 26, prs: 25, downloads: 1081 },
  'lighthouse-audit-utils': { commits: 25, prs: 31, downloads: 3221 },
  'lint-package-json': { commits: 7, prs: 3 },
  'mik-automator': { commits: 6, prs: 2, downloads: 328 },
  'persistent-logger': { commits: 19, prs: 20, downloads: 770 },
  'pr-diff-line-count': { commits: 30, prs: 39 },
  'react-component-test-suite': { commits: 22, prs: 23, downloads: 757 },
  'react-toolkit': { commits: 22, prs: 19, downloads: 1256 },
  'serato-tools': { commits: 360, prs: 77, downloads: 70988 },
  'serato-usb-export': { commits: 7, prs: 3, downloads: 5303 },
  'specialingredientbass.com': { commits: 97, prs: 58 },
  'tsx-to-pdf': { commits: 40, prs: 51, downloads: 2411 },
  'womanhoodofwubz.com': { commits: 51, prs: 46 },
}
