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
            My flagship project: after trying 30+ to-do apps, I built my own. An
            offline-first, cross-device-synced task manager with advanced
            ranking, nesting, dependencies, customization, and rules. 600+ PRs,
            each reviewed and refined.
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
            Interactive map of years of my GPS bike ride data.
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
            CMS-driven storefront with custom React components, built for a
            friend.
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
        name: 'lighthouse-audit-utils',
        href: 'https://www.npmjs.com/package/lighthouse-audit-utils',
        type: 'npm',
        repo: 'lighthouse-audit-utils',
        blurb: (
          <>
            Run Lighthouse audits with threshold checks, readable
            recommendations, report output, and a Playwright fixture.
          </>
        ),
      },
      {
        name: 'pr-diff-line-count',
        href: 'https://github.com/marketplace/actions/pr-diff-line-count',
        type: 'github',
        repo: 'pr-diff-line-count',
        blurb: (
          <>
            GitHub Action for accurate PR diff line counts via cloc, split by
            source, tests, docs, and config.
            <RepoLink repo="pr-diff-line-count" />
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
            GitHub Action that polls a URL to detect when a deploy has gone
            live.
            <RepoLink repo="detect-deploy" />
          </>
        ),
      },
      {
        name: 'react-component-test-suite',
        href: 'https://www.npmjs.com/package/react-component-test-suite',
        type: 'npm',
        repo: 'react-component-test-suite',
        blurb: (
          <>
            Auto-title Vitest and Jest suites from the React component's name.
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
            GitHub Action that enforces shared package.json lint rules across
            repos.
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
          <>Rule-based ordering of nested glob results for test configs.</>
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
          <>JSX + Tailwind to page-exact PDF, with a live-preview dev server.</>
        ),
      },
      {
        name: 'persistent-logger',
        href: 'https://www.npmjs.com/package/persistent-logger',
        type: 'npm',
        repo: 'persistent-logger',
        blurb: (
          <>
            Crash-resilient, localStorage-backed browser diagnostics logging,
            with optional React hooks.
          </>
        ),
      },
      {
        name: 'react-toolkit',
        href: 'https://www.npmjs.com/package/@bvandrc/react-toolkit',
        type: 'npm',
        repo: 'react-toolkit',
        blurb: <>Generic React hooks and helpers for browser UI behavior.</>,
      },
      {
        name: 'serato-tools',
        href: 'https://pypi.org/project/serato-tools/',
        type: 'python',
        repo: 'serato-tools',
        blurb: (
          <>
            Python tools for reading and modifying Serato DJ's tracks, hot cues,
            waveforms, metadata, crates, and library database.
            <RepoLink repo="serato-tools" />
          </>
        ),
      },
      {
        name: 'serato-usb-export',
        href: 'https://pypi.org/project/serato-usb-export/',
        type: 'python',
        blurb: <>Fast, deduplicated USB export tool for Serato DJ.</>,
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
            Python automation for my 11k+ track DJ library utilizing the Spotify
            and SoundCloud APIs. <em>(private repo)</em>
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
            Firmware for my LED festival totem, controlled by dials, buttons,
            and an accelerometer.
          </>
        ),
      },
    ],
  },
]

const ProjectEntry = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  return (
    <p>
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
              width="400"
              alt={`${p.name} — screenshot preview`}
            />
          </a>
        </>
      )}
    </p>
  )
}

/** Every project section, laid out as centered paragraphs (relies on the README's centered wrapper). */
export const Projects = () =>
  PROJECT_SECTIONS.map((s) => (
    <>
      <SectionTitle emoji={s.emoji} title={s.title} />
      {s.intro && (
        <p>
          <em>
            <strong>{s.intro}</strong>
          </em>
        </p>
      )}
      {s.projects.map((p) => (
        <ProjectEntry p={p} />
      ))}
    </>
  ))
