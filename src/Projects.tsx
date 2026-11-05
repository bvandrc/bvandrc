import { kebabCase } from 'es-toolkit'
import type { ComponentChildren } from 'preact'

import { CountBadge, type CountBadgeProps, countBadgeWidth } from './CountBadge'
import {
  ICON_GRAY,
  type ProjectType,
  repoUrl,
  TYPE_ICON_HEIGHT,
  TYPE_ICONS,
} from './constants'
import { REPO_BADGE_WIDTH, RepoBadge } from './RepoBadge'
import { SectionTitle } from './SectionHeadings'

type Project = CountBadgeProps & {
  name: string
  href: string
  type: ProjectType
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

const PROJECT_SECTIONS: ProjectSection[] = [
  {
    emoji: '⚛️',
    title: 'React Websites',
    intro:
      'Each runs E2E, accessibility, and Lighthouse tests in CI on every PR.',
    projects: [
      {
        name: 'TaskRankr',
        href: 'https://taskrankr.com/guest',
        type: 'react',
        repo: 'TaskRankr',
        blurb:
          'My flagship project: after trying 30+ to-do apps, I built my own. An offline-first, cross-device-synced task manager with advanced ranking, nesting, dependencies, customization, and rules. 600+ PRs, each reviewed and refined.',
        screenshot: './project-screenshots/resized/screenshot-taskrankr.png',
      },
      {
        name: 'Bike Ride Tracker',
        href: 'https://bvandrc.github.io/bike-ride-mapper/',
        type: 'react',
        repo: 'bike-ride-mapper',
        blurb: 'Interactive map of years of my GPS bike ride data.',
        screenshot:
          './project-screenshots/resized/screenshot-bike-ride-mapper.png',
      },
      {
        name: 'DJ Website',
        href: 'https://specialingredientbass.com/',
        type: 'react',
        repo: 'specialingredientbass.com',
        blurb:
          'My side hobby. All custom React components, using the SoundCloud API.',
        screenshot:
          './project-screenshots/resized/screenshot-specialingredientbass.png',
      },
      {
        name: 'Retail Website',
        href: 'https://womanhoodofwubz.neocities.org/',
        type: 'react',
        repo: 'womanhoodofwubz.com',
        blurb:
          'CMS-driven storefront with custom React components, built for a friend.',
        screenshot:
          './project-screenshots/resized/screenshot-womanhoodofwubz.png',
      },
    ],
  },
  {
    emoji: '🧪',
    title: 'Testing & CI Tooling',
    projects: [
      {
        name: 'lighthouse-audit-utils',
        href: 'https://www.npmjs.com/package/lighthouse-audit-utils',
        type: 'npm',
        repo: 'lighthouse-audit-utils',
        blurb:
          'Run Lighthouse audits with threshold checks, readable recommendations, report output, and a Playwright fixture.',
      },
      {
        name: 'pr-diff-line-count',
        href: 'https://github.com/marketplace/actions/pr-diff-line-count',
        type: 'github',
        repo: 'pr-diff-line-count',
        blurb:
          'GitHub Action for accurate PR diff line counts via cloc, split by source, tests, docs, and config.',
      },
      {
        name: 'detect-deploy',
        href: 'https://github.com/marketplace/actions/detect-deploy',
        type: 'github',
        repo: 'detect-deploy',
        blurb:
          'GitHub Action that polls a URL to detect when a deploy has gone live.',
      },
      {
        name: 'react-component-test-suite',
        href: 'https://www.npmjs.com/package/react-component-test-suite',
        type: 'npm',
        repo: 'react-component-test-suite',
        blurb:
          "Auto-title Vitest and Jest suites from the React component's name.",
      },
      {
        name: 'lint-package-json',
        href: 'https://github.com/marketplace/actions/package-json-lint',
        type: 'github',
        repo: 'lint-package-json',
        blurb:
          'GitHub Action that enforces shared package.json lint rules across repos.',
      },
      {
        name: 'glob-sort',
        href: 'https://www.npmjs.com/package/glob-sort',
        type: 'npm',
        repo: 'glob-sort',
        blurb: 'Rule-based ordering of nested glob results for test configs.',
      },
    ],
  },
  {
    emoji: '📦',
    title: 'Other Packages',
    projects: [
      {
        name: 'tsx-to-pdf',
        href: 'https://www.npmjs.com/package/tsx-to-pdf',
        type: 'npm',
        repo: 'tsx-to-pdf',
        blurb:
          'JSX + Tailwind to page-exact PDF, with a live-preview dev server.',
      },
      {
        name: 'persistent-logger',
        href: 'https://www.npmjs.com/package/persistent-logger',
        type: 'npm',
        repo: 'persistent-logger',
        blurb:
          'Crash-resilient, localStorage-backed browser diagnostics logging, with optional React hooks.',
      },
      {
        name: 'react-toolkit',
        href: 'https://www.npmjs.com/package/@bvandrc/react-toolkit',
        type: 'npm',
        repo: 'react-toolkit',
        blurb: 'Generic React hooks and helpers for browser UI behavior.',
      },
      {
        name: 'serato-tools',
        href: 'https://pypi.org/project/serato-tools/',
        type: 'python',
        repo: 'serato-tools',
        blurb:
          "Python tools for reading and modifying Serato DJ's tracks, hot cues, waveforms, metadata, crates, and library database.",
      },
      {
        name: 'serato-usb-export',
        href: 'https://pypi.org/project/serato-usb-export/',
        type: 'python',
        repo: 'serato-usb-export',
        blurb: 'Fast, deduplicated USB export tool for Serato DJ.',
      },
    ],
  },
  {
    emoji: '💡',
    title: 'Other Projects',
    projects: [
      {
        name: 'spotify-organizer',
        href: 'https://github.com/bvandrc/SD',
        type: 'python',
        repo: 'SD',
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
        blurb:
          'Firmware for my LED festival totem, controlled by dials, buttons, and an accelerometer.',
      },
    ],
  },
]

/** Width of one `&nbsp;` in GitHub's README body font, in px. */
const NBSP = 4.5

/** `&nbsp;` between the project title and its type icon. */
const TITLE_GAP = 4 * NBSP

/**
 * `&nbsp;` between one badge and the next.
 *
 * One, against three elsewhere on the line: both badges carry their own end
 * padding, so the gap a reader sees is about 5px wider than the markup says.
 */
const BADGE_GAP = 1 * NBSP

/**
 * Width of the blank image that counterweights a project's badges.
 *
 * Balancing the title means matching everything to its right, where the type
 * icon and the gap before the badges cancel against the left, leaving the
 * badges themselves and the gap that opens before the icon. Each width is
 * known at build time, so this is exact per project rather than one estimate
 * for all of them — which centres every title instead of an average one.
 */
const spacerWidth = (repo: string) => {
  const counts = countBadgeWidth(repo)
  const badges =
    counts > 0 ? counts + BADGE_GAP + REPO_BADGE_WIDTH : REPO_BADGE_WIDTH
  return Math.round(TITLE_GAP + badges)
}

/** Every repo a project names, which `scripts/fetch-counts.ts` reads. */
export const PROJECT_REPOS = PROJECT_SECTIONS.flatMap(({ projects }) =>
  projects.map(({ repo }) => repo).filter((repo) => repo !== undefined)
)

const ProjectEntry = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  const iconUrl = (color: string) =>
    `https://cdn.simpleicons.org/${icon.slug}/${color}`
  const spacer = spacerWidth(p.repo)
  const typeIcon = (
    <img
      src={iconUrl(ICON_GRAY)}
      height={TYPE_ICON_HEIGHT}
      alt={icon.title}
      title={icon.title}
    />
  )
  return (
    <p>
      {/* a fully transparent copy of the icon balances it, so the title
          centers on its own text, and a blank spacer carries the badges'
          weight, which have no twin to mirror them. Both are invisible but
          an unwrapped README image still links to its own camo URL, so they
          go where the title goes. One anchor holds the pair, which is what
          keeps them touching — a space between would widen this side. */}
      <a href={p.href} target="_blank" rel="noopener">
        <img src={iconUrl('00000000')} height={TYPE_ICON_HEIGHT} alt="" />
        <img
          src="./assets/spacer.png"
          width={spacer}
          height={TYPE_ICON_HEIGHT}
          alt=""
        />
      </a>
      &nbsp;&nbsp;&nbsp;
      <strong>
        <a href={p.href} target="_blank" rel="noopener">
          {p.name}
        </a>
      </strong>
      {/* one more than the gap after the icon, which the badge's own left
          padding widens by about 6px, so the icon sits evenly between the two */}
      &nbsp;&nbsp;&nbsp;&nbsp;
      {/* every image here is wrapped, because GitHub links an unwrapped README
          image to its own camo URL — an asset rather than anywhere useful.
          One anchor each, never one around the group: the spacing between
          them would sit inside it as link text and draw its underline. */}
      <a
        href={icon.published ? p.href : repoUrl(p.repo)}
        target="_blank"
        rel="noopener">
        {typeIcon}
      </a>
      &nbsp;&nbsp;&nbsp;
      {countBadgeWidth(p.repo) > 0 && (
        <>
          <a href={repoUrl(p.repo)} target="_blank" rel="noopener">
            <CountBadge repo={p.repo} />
          </a>
          &nbsp;
        </>
      )}
      <a href={repoUrl(p.repo)} target="_blank" rel="noopener">
        <RepoBadge />
      </a>
      <br />
      {p.blurb}
      {p.screenshot && (
        <>
          <br />
          <a href={p.href} target="_blank" rel="noopener">
            <img
              src={p.screenshot}
              width="385"
              alt={`${p.name} — screenshot preview`}
            />
          </a>
        </>
      )}
    </p>
  )
}

/** Every project section, laid out as centered paragraphs (relies on the README's centered wrapper). */
export const Projects = () => (
  <>
    {/* contents line: jump links to each section's anchor */}
    <p>
      {PROJECT_SECTIONS.map((s, i) => (
        <>
          {i > 0 && ' · '}
          <a href={`#${kebabCase(s.title)}`}>
            {s.emoji}&nbsp;{s.title}
          </a>
        </>
      ))}
    </p>
    {PROJECT_SECTIONS.map((s) => (
      <>
        {/* GitHub doesn't add anchors to raw HTML headings, so the contents line targets this id */}
        <SectionTitle id={kebabCase(s.title)} emoji={s.emoji} title={s.title} />
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
    ))}
  </>
)
