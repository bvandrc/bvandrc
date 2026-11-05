/**
 * @fileoverview Shapes of the profile content, with no rendering dependency.
 *
 * Kept free of Preact, and the content files of JSX, so other repos can fetch
 * `src/content/` and type-check it as plain TypeScript.
 */

export type ProjectType = 'react' | 'npm' | 'github' | 'python' | 'arduino'

export type Project = {
  name: string
  href: string
  type: ProjectType
  /** GitHub repo name under bvandrc, whose counts `pnpm gen:counts` committed */
  repo: string
  blurb: string
  /** Marks a private repo, which renderers note after the blurb. */
  private?: boolean
  /** screenshot path; its alt text is derived from the project name */
  screenshot?: string
}

export type ProjectSection = {
  emoji: string
  title: string
  intro?: string
  projects: Project[]
}

export type SkillBadge = {
  alt: string
  path: string
  logo: string
  logoColor: string
}

export type SkillRow = {
  /** One line, or several shown one per line. */
  label: string | string[]
  lines: SkillBadge[][]
}

export type SkillSection = { emoji: string; title: string; rows: SkillRow[] }
