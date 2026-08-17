import type { ComponentChildren } from 'preact'
import { ICON_GRAY, SectionTitle } from './components'

const BADGE_BG = '2f363d'

const octicon = (path: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#${ICON_GRAY}">${path}</svg>`
  const b64 = Buffer.from(svg).toString('base64')
  return `data:image/svg%2Bxml;base64,${encodeURIComponent(b64)}`
}

// GitHub octicons (git-commit-16, git-pull-request-16), tinted to match the project icons
const COMMIT_LOGO = octicon(
  '<path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>',
)
const PR_LOGO = octicon(
  '<path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/>',
)

export type ProjectType = 'react' | 'npm' | 'github' | 'python' | 'arduino'

const TYPE_ICONS: Record<
  ProjectType,
  { slug: string; alt: string; title: string }
> = {
  react: { slug: 'react', alt: 'React', title: 'React' },
  npm: { slug: 'npm', alt: 'npm', title: 'npm (Typescript)' },
  github: {
    slug: 'github',
    alt: 'GitHub Marketplace',
    title: 'GitHub Marketplace',
  },
  python: { slug: 'python', alt: 'Python', title: 'Python' },
  arduino: { slug: 'arduino', alt: 'Arduino', title: 'Arduino' },
}

export type Project = {
  name: string
  href: string
  type: ProjectType
  /** GitHub repo name under bvandrc — enables live commit/PR count badges */
  repo?: string
  /** static counts for repos shields.io can't see (private) */
  counts?: { commits: number; prs: number }
  blurb: ComponentChildren
  screenshot?: { src: string; alt: string }
}

export type ProjectSection = {
  emoji: string
  title: string
  intro?: ComponentChildren
  projects: Project[]
}

export const RepoLink = ({ repo }: { repo: string }) => (
  <>
    &nbsp;<a href={`https://github.com/bvandrc/${repo}`}>[repo]</a>
  </>
)

const CommitBadge = ({ repo, counts }: Pick<Project, 'repo' | 'counts'>) => (
  <img
    align="right"
    src={
      repo
        ? `https://img.shields.io/github/commit-activity/t/bvandrc/${repo}?style=flat-square&label=&logo=${COMMIT_LOGO}&color=${BADGE_BG}`
        : `https://img.shields.io/badge/${counts!.commits}-${BADGE_BG}?style=flat-square&logo=${COMMIT_LOGO}`
    }
    height="18"
    alt="commit count"
    title="Commits"
  />
)

const PrBadge = ({ repo, counts }: Pick<Project, 'repo' | 'counts'>) => (
  <img
    align="right"
    src={
      repo
        ? `https://img.shields.io/github/issues-search?query=repo%3Abvandrc%2F${repo}%20is%3Apr&style=flat-square&label=&logo=${PR_LOGO}&color=${BADGE_BG}`
        : `https://img.shields.io/badge/${counts!.prs}-${BADGE_BG}?style=flat-square&logo=${PR_LOGO}`
    }
    height="18"
    alt="PR count"
    title="Pull Requests"
  />
)

const ProjectRow = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  const hasCounts = Boolean(p.repo || p.counts)
  return (
    <tr>
      <td align="center">
        {/* invisible left counterweight so the centered title stays on the card's centerline */}
        <img
          align="left"
          src="./assets/spacer.png"
          width={hasCounts ? '130' : '19'}
          height="18"
          alt=""
        />
        {/* right floats stack right-to-left: first in source renders outermost */}
        {hasCounts && <PrBadge repo={p.repo} counts={p.counts} />}
        {hasCounts && <CommitBadge repo={p.repo} counts={p.counts} />}
        <img
          align="right"
          src={`https://cdn.simpleicons.org/${icon.slug}/${ICON_GRAY}`}
          height="15"
          alt={icon.alt}
          title={icon.title}
        />
        <strong>
          <a href={p.href}>{p.name}</a>
        </strong>
        <br />
        {p.blurb}
        {p.screenshot && (
          <>
            <br />
            <a href={p.href}>
              <img src={p.screenshot.src} width="450" alt={p.screenshot.alt} />
            </a>
            <br />
          </>
        )}
      </td>
    </tr>
  )
}

export const ProjectsTable = ({ sections }: { sections: ProjectSection[] }) => (
  <table>
    <tbody>
      {sections.map((s) => (
        <>
          <tr>
            <td align="center">
              <SectionTitle emoji={s.emoji} title={s.title} />
              {s.intro && (
                <em>
                  <strong>{s.intro}</strong>
                </em>
              )}
            </td>
          </tr>
          {s.projects.map((p) => (
            <ProjectRow p={p} />
          ))}
        </>
      ))}
    </tbody>
  </table>
)
