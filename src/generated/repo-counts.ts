// GENERATED FILE — do not edit directly. Run `pnpm gen:counts`.

type RepoCounts = { commits: number; prs: number }

/**
 * Each project repo's total commits and pull requests, refreshed weekly.
 *
 * Typed as possibly absent because a lookup can miss: a repo `pnpm gen:counts`
 * has never read — a private one before its token is configured — has no entry.
 */
export const REPO_COUNTS: Record<string, RepoCounts | undefined> = {
  'SD': { commits: 547, prs: 0 },
  'arduino-totem': { commits: 36, prs: 7 },
  'bike-ride-mapper': { commits: 87, prs: 44 },
  'detect-deploy': { commits: 17, prs: 25 },
  'glob-sort': { commits: 26, prs: 25 },
  'lighthouse-audit-utils': { commits: 25, prs: 31 },
  'lint-package-json': { commits: 7, prs: 3 },
  'persistent-logger': { commits: 19, prs: 20 },
  'pr-diff-line-count': { commits: 30, prs: 39 },
  'react-component-test-suite': { commits: 22, prs: 23 },
  'react-toolkit': { commits: 19, prs: 16 },
  'serato-tools': { commits: 343, prs: 59 },
  'specialingredientbass.com': { commits: 93, prs: 55 },
  'tsx-to-pdf': { commits: 40, prs: 51 },
  'womanhoodofwubz.com': { commits: 49, prs: 44 },
}
