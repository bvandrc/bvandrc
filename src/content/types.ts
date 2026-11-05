/**
 * @fileoverview Shapes of the profile content, with no rendering dependency.
 *
 * Kept free of Preact, and the content files of JSX, so other repos can fetch
 * `src/content/` and type-check it as plain TypeScript.
 */

export type ProjectType =
  | 'react'
  | 'npm'
  | 'github'
  | 'worker'
  | 'python'
  | 'arduino'

export type Project = {
  name: string
  href: string
  type: ProjectType
  /** GitHub repo name under bvandrc, whose counts `pnpm gen:counts` committed */
  repo: string
  blurb: string
  /** screenshot path; its alt text is derived from the project name */
  screenshot?: string
}

/** A simpleicons.org logo, drawn in its brand colour. */
export type SectionLogo = {
  /** simpleicons.org slug */
  slug: string
  /** hex colour, without the `#` */
  color: string
}

export type ProjectSection = {
  /** The section's mark: an emoji, or a logo where no emoji fits. */
  emoji: string | SectionLogo
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
  /** The row's label; a `\n` marks where it breaks onto a new line. */
  label: string
  lines: SkillBadge[][]
}

export type SkillSection = { emoji: string; title: string; rows: SkillRow[] }
