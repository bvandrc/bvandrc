// GENERATED FILE — do not edit directly. Run `pnpm gen:counts`.

type RepoCounts = { commits: number; prs: number }

/**
 * Each project repo's total commits and pull requests, refreshed weekly.
 *
 * Typed as possibly absent because a lookup can miss: a repo `pnpm gen:counts`
 * has never read — a private one before its token is configured — has no entry.
 */
export const REPO_COUNTS: Record<string, RepoCounts | undefined> = {
  'SD': { commits: 557, prs: 9 },
  'TaskRankr': { commits: 667, prs: 657 },
  'arduino-totem': { commits: 36, prs: 7 },
  'badgesmith': { commits: 28, prs: 28 },
  'bike-ride-mapper': { commits: 88, prs: 45 },
  'detect-deploy': { commits: 17, prs: 25 },
  'glob-sort': { commits: 26, prs: 25 },
  'lighthouse-audit-utils': { commits: 25, prs: 31 },
  'lint-package-json': { commits: 7, prs: 3 },
  'persistent-logger': { commits: 19, prs: 20 },
  'pr-diff-line-count': { commits: 30, prs: 39 },
  'react-component-test-suite': { commits: 22, prs: 23 },
  'react-toolkit': { commits: 21, prs: 18 },
  'serato-tools': { commits: 350, prs: 67 },
  'serato-usb-export': { commits: 7, prs: 3 },
  'specialingredientbass.com': { commits: 96, prs: 58 },
  'tsx-to-pdf': { commits: 40, prs: 51 },
  'womanhoodofwubz.com': { commits: 51, prs: 46 },
}
