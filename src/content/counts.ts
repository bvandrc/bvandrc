/**
 * One of the counts a project's badge shows, and bvandercar.dev's project cards.
 *
 * `key` names its entry in `src/generated/repo-counts.ts`. `icon` is an
 * Octicons name, which badgesmith draws here, and which Lucide also answers to
 * on bvandercar.dev. `noun` is what one of it is called.
 */
export type CountKind = { key: string; icon: string; noun: string }

/** A project's counts, in the order its badge shows them. */
export const COUNT_KINDS = [
  { key: 'commits', icon: 'git-commit', noun: 'commit' },
  { key: 'prs', icon: 'git-pull-request', noun: 'PR' },
  { key: 'downloads', icon: 'download', noun: 'download' },
] as const satisfies readonly CountKind[]
