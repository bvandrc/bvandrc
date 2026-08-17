import type { ComponentChildren } from 'preact'

import { ICON_GRAY, type ProjectType, TYPE_ICONS } from './constants'
import { SectionTitle } from './SectionHeadings'

type Project = {
  name: string
  href: string
  type: ProjectType
  /** GitHub repo name under bvandrc — enables live commit/PR count badges */
  repo?: string
  /** static counts for repos the GitHub API can't see (private) */
  counts?: { commits: number; prs: number }
  blurb: ComponentChildren
  /** screenshot path; its alt text is derived from the project name */
  screenshot?: string
}

type ProjectSection = {
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

const PROJECT_SECTIONS: ProjectSection[] = [
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
        screenshot: './project-screenshots/resized/screenshot-taskrankr.png',
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
        screenshot:
          './project-screenshots/resized/screenshot-bike-ride-mapper.png',
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
        screenshot:
          './project-screenshots/resized/screenshot-specialingredientbass.png',
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
        screenshot:
          './project-screenshots/resized/screenshot-womanhoodofwubz.png',
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
            Run Lighthouse audits with threshold checks, report writing, a
            readable terminal recommendation list, and Playwright integration.
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

const ProjectRow = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  return (
    <tr>
      <td align="center">
        {/* invisible spacer mirrors the icon so the title stays centered on its own text */}
        <img src="./assets/spacer.png" width="15" height="15" alt="" />
        &nbsp;&nbsp;&nbsp;
        <strong>
          <a href={p.href}>{p.name}</a>
        </strong>
        &nbsp;&nbsp;&nbsp;
        <img
          src={`https://cdn.simpleicons.org/${icon.slug}/${ICON_GRAY}`}
          height="15"
          alt={icon.title}
          title={icon.title}
        />
        <br />
        {p.blurb}
        {p.screenshot && (
          <>
            <br />
            <a href={p.href}>
              <img
                src={p.screenshot}
                width="450"
                alt={`${p.name} — screenshot preview`}
              />
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
