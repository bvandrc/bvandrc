import type { ProjectType } from './project-types'

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
  /** An emoji, or a logo where no emoji fits. */
  icon: string | SectionLogo
  title: string
  intro?: string
  projects: Project[]
}

export const PROJECTS: ProjectSection[] = [
  {
    icon: { slug: 'react', color: '61DAFB' },
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
    icon: '🧪',
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
    icon: '📦',
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
    icon: '💡',
    title: 'Other Projects',
    projects: [
      {
        name: 'badgesmith',
        href: 'https://badgesmith.bvandrc.workers.dev/',
        type: 'worker',
        repo: 'badgesmith',
        blurb:
          'Cloudflare Worker that renders several icons and values as one SVG badge, with advanced formatting and live GitHub counts. It draws the badges on this page.',
      },
      {
        name: 'spotify-organizer',
        href: 'https://github.com/bvandrc/SD',
        type: 'python',
        repo: 'SD',
        blurb:
          'Python automation for my 11k+ track DJ library utilizing the Spotify and SoundCloud APIs.',
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

/** Every repo a project names, which `scripts/fetch-counts.ts` reads. */
export const PROJECT_REPOS = PROJECTS.flatMap(({ projects }) =>
  projects.map(({ repo }) => repo).filter((repo) => repo !== undefined)
)
