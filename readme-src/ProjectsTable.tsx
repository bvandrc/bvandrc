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

const TYPE_ICONS: Record<ProjectType, { slug: string; title: string }> = {
  react: { slug: 'react', title: 'React' },
  npm: { slug: 'npm', title: 'npm (Typescript)' },
  github: { slug: 'github', title: 'GitHub Marketplace' },
  python: { slug: 'python', title: 'Python' },
  arduino: { slug: 'arduino', title: 'Arduino' },
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

const RepoLink = ({ repo }: { repo: string }) => (
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
          alt={icon.title}
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

export const ProjectsTable = () => (
  <table>
    <tbody>
      {PROJECT_SECTIONS.map((s) => (
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

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    emoji: '⚛️⚛️',
    title: 'React Websites',
    intro:
      'Each runs E2E, accessibility, and Lighthouse tests in CI on every PR.',
    projects: [
      {
        name: 'TaskRankr',
        href: 'https://taskrankr.com/guest',
        type: 'react',
        repo: 'TaskRankr',
        blurb: (
          <>
            My most substantial project: I tried over 30 to-do apps and none
            managed tasks the way I wanted, so I built one. Advanced ranking,
            filtering, customization, nested subtasks with per-level rules, and
            cross-task dependencies. Fully offline-capable, with server sync
            across devices. Shipped across 250+ PRs, each carefully reviewed and
            refactored.
            <RepoLink repo="TaskRankr" />
          </>
        ),
        screenshot: {
          src: './project-screenshots/resized/screenshot-taskrankr.png',
          alt: 'TaskRankr — screenshot preview',
        },
      },
      {
        name: 'Bike Ride Tracker',
        href: 'https://bvandrc.github.io/bike-ride-mapper/',
        type: 'react',
        repo: 'bike-ride-mapper',
        blurb: (
          <>
            A map overlaying every bike ride I've done over the past few years.
            <RepoLink repo="bike-ride-mapper" />
          </>
        ),
        screenshot: {
          src: './project-screenshots/resized/screenshot-bike-ride-mapper.png',
          alt: 'Bike Ride Tracker — screenshot preview',
        },
      },
      {
        name: 'DJ Website',
        href: 'https://specialingredientbass.com/',
        type: 'react',
        repo: 'specialingredientbass.com',
        blurb: (
          <>
            My side hobby. All custom React components, using the SoundCloud
            API.
            <RepoLink repo="specialingredientbass.com" />
          </>
        ),
        screenshot: {
          src: './project-screenshots/resized/screenshot-specialingredientbass.png',
          alt: 'Special Ingredient Bass Mixes — screenshot preview',
        },
      },
      {
        name: 'Retail Website',
        href: 'https://womanhoodofwubz.neocities.org/',
        type: 'react',
        repo: 'womanhoodofwubz.com',
        blurb: (
          <>
            Retail website for a friend using a CMS and custom React components.
            <RepoLink repo="womanhoodofwubz.com" />
          </>
        ),
        screenshot: {
          src: './project-screenshots/resized/screenshot-womanhoodofwubz.png',
          alt: 'Womanhood of Wubz — screenshot preview',
        },
      },
    ],
  },
  {
    emoji: '🧪🧪',
    title: 'Testing & CI Tooling',
    projects: [
      {
        name: 'react-component-test-suite',
        href: 'https://www.npmjs.com/package/react-component-test-suite',
        type: 'npm',
        repo: 'react-component-test-suite',
        blurb: (
          <>
            Create custom React component test suites for Vitest or Jest that
            automatically give the name of the React component to the title of
            the test suite.
          </>
        ),
      },
      {
        name: 'lighthouse-audit-utils',
        href: 'https://www.npmjs.com/package/lighthouse-audit-utils',
        type: 'npm',
        repo: 'lighthouse-audit-utils',
        blurb: (
          <>
            Run Lighthouse audits with threshold checks, report writing, and a
            readable terminal recommendation list.
          </>
        ),
      },
      {
        name: 'detect-deploy',
        href: 'https://github.com/marketplace/actions/detect-deploy',
        type: 'github',
        repo: 'detect-deploy',
        blurb: (
          <>
            GitHub Action that polls a URL until its content changes, to detect
            when a deploy has actually gone live.
            <RepoLink repo="detect-deploy" />
          </>
        ),
      },
      {
        name: 'lint-package-json',
        href: 'https://github.com/marketplace/actions/package-json-lint',
        type: 'github',
        repo: 'lint-package-json',
        blurb: (
          <>
            GitHub Action that lints every package.json in a repo against a
            shared npm-package-json-lint rule set.
            <RepoLink repo="lint-package-json" />
          </>
        ),
      },
      {
        name: 'glob-sort',
        href: 'https://www.npmjs.com/package/glob-sort',
        type: 'npm',
        repo: 'glob-sort',
        blurb: (
          <>
            Provide custom rules to sort nested glob results. Useful for test
            configuration.
          </>
        ),
      },
    ],
  },
  {
    emoji: '📦📦',
    title: 'Other Packages',
    projects: [
      {
        name: 'tsx-to-pdf',
        href: 'https://www.npmjs.com/package/tsx-to-pdf',
        type: 'npm',
        repo: 'tsx-to-pdf',
        blurb: (
          <>
            Write a document as JSX (React syntax), style it with Tailwind, and
            render it to a page-exact PDF and HTML — with a live-preview dev
            server.
          </>
        ),
      },
      {
        name: 'serato-tools',
        href: 'https://pypi.org/project/serato-tools/',
        type: 'python',
        repo: 'serato-tools',
        blurb: (
          <>
            Various Python tools for the Serato DJ software
            <RepoLink repo="serato-tools" />
          </>
        ),
      },
      {
        name: 'serato-usb-export',
        href: 'https://pypi.org/project/serato-usb-export/',
        type: 'python',
        blurb: <>USB Export tool for the Serato DJ software</>,
      },
    ],
  },
  {
    emoji: '💡💡',
    title: 'Other Projects',
    projects: [
      {
        name: 'spotify-organizer',
        href: 'https://github.com/bvandrc/SD',
        type: 'python',
        counts: { commits: 547, prs: 0 },
        blurb: (
          <>
            Python program that uses the Spotify and SoundCloud APIs to organize
            my music and DJ library. <em>(private repo)</em>
          </>
        ),
      },
      {
        name: 'arduino-totem',
        href: 'https://github.com/bvandrc/arduino-totem',
        type: 'arduino',
        repo: 'arduino-totem',
        blurb: (
          <>
            The code that runs my festival totem—an LED-lit sign controlled on
            the fly with dials, buttons, and a tap-sensitive accelerometer.
          </>
        ),
      },
    ],
  },
]
