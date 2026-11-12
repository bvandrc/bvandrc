import type { ProjectType } from './project-types'
import type { GroupGlyph } from './sections'

export type Project = {
  name: string
  href: string
  type: ProjectType
  /** GitHub repo name under bvandrc, whose counts `pnpm gen:counts` committed */
  repo: string
  /** Name the project is published under on npm, whose all-time downloads `pnpm gen:counts` committed */
  npmPackage?: string
  /** Name the project is published under on PyPI, whose all-time downloads `pnpm gen:counts` committed */
  pypiPackage?: string
  /** Its description, where `{commits}`, `{prs}`, or `{downloads}` stands for that count, filled by `fillBlurb` */
  blurb: string
  /** screenshot path; its alt text is derived from the project name */
  screenshot?: string
  /**
   * bvandercar.dev shows the live site at `href` in an iframe, in place of the
   * screenshot; the README ignores it. Leave it off a site that refuses framing.
   */
  embed?: ProjectEmbed
}

export type ProjectEmbed = {
  /** How far to shrink the framed page, so more of its layout fits (0.5 = 50%). Defaults to 1. */
  scale?: number
  /** How many px of the screenshot's top a phone shows across the preview's toggle, for one whose busy top crowds the label. Defaults to 64. */
  posterHeight?: number
}

/** A simpleicons.org logo, drawn in its brand colour. */
export type SectionLogo = {
  /** simpleicons.org slug */
  slug: string
  /** hex colour, without the `#` */
  color: string
}

export type ProjectSection = (
  | {
      /** A logo where no emoji fits, which the site draws as-is. */
      icon: SectionLogo
      glyph?: never
    }
  | {
      icon: string
      /** The site's glyph for the heading, drawn in place of the emoji. */
      glyph: GroupGlyph
    }
) & {
  title: string
  intro?: string
  /**
   * Whether bvandercar.dev keeps its chip in its reduced contents, the fewer
   * chips it shows on a narrow screen, where they don't all fit. Defaults to
   * true.
   *
   * Without one there, the chip before it stays lit while a reader scrolls
   * through it, and the site's contents menu still lists it. The README's
   * contents list every group either way.
   */
  inReducedContents?: boolean
  projects: Project[]
}

/**
 * A project's blurb, with each `{commits}`, `{prs}`, or `{downloads}` filled
 * with that count rounded down to the ten, as "580" for 587.
 *
 * Throws on a placeholder with no count to fill it, rather than show the
 * placeholder.
 */
export const fillBlurb = (
  blurb: string,
  counts: Partial<Record<string, number>> | undefined
) =>
  blurb.replaceAll(/\{(\w+)\}/g, (placeholder, key: string) => {
    const count = counts?.[key]
    if (count === undefined) {
      throw new Error(`No count fills ${placeholder} in "${blurb}"`)
    }
    return (Math.floor(count / 10) * 10).toLocaleString('en-US')
  })

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
          'My flagship project: after trying 30+ to-do apps, I built my own. An offline-first, cross-device-synced task manager with advanced ranking, nesting, dependencies, customization, and rules. {prs}+ PRs, each reviewed and refined.',
        screenshot: './project-screenshots/resized/screenshot-taskrankr.png',
        embed: { scale: 0.75 },
      },
      {
        name: 'Bike Ride Tracker',
        href: 'https://bvandrc.github.io/bike-ride-mapper/',
        type: 'react',
        repo: 'bike-ride-mapper',
        blurb: 'Interactive map of years of my GPS bike ride data.',
        screenshot:
          './project-screenshots/resized/screenshot-bike-ride-mapper.png',
        embed: { scale: 0.9 },
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
        embed: { scale: 0.5, posterHeight: 48 },
      },
      {
        name: 'Retail Website',
        href: 'https://womanhoodofwubz.pages.dev/',
        type: 'react',
        repo: 'womanhoodofwubz.com',
        blurb:
          'CMS-driven storefront with custom React components, built for a friend.',
        screenshot:
          './project-screenshots/resized/screenshot-womanhoodofwubz.png',
        embed: { scale: 0.6, posterHeight: 48 },
      },
    ],
  },
  {
    icon: '🧪',
    glyph: { name: 'test-tube-diagonal', color: '05DF72' },
    title: 'Testing & CI Tooling',
    projects: [
      {
        name: 'lighthouse-audit-utils',
        href: 'https://www.npmjs.com/package/lighthouse-audit-utils',
        type: 'npm',
        repo: 'lighthouse-audit-utils',
        npmPackage: 'lighthouse-audit-utils',
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
        npmPackage: 'react-component-test-suite',
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
        npmPackage: 'glob-sort',
        blurb: 'Rule-based ordering of nested glob results for test configs.',
      },
    ],
  },
  {
    icon: '🛠️',
    glyph: { name: 'package-open', color: 'A7723D' },
    title: 'Other Tools',
    projects: [
      {
        name: 'tsx-to-pdf',
        href: 'https://www.npmjs.com/package/tsx-to-pdf',
        type: 'npm',
        repo: 'tsx-to-pdf',
        npmPackage: 'tsx-to-pdf',
        blurb:
          'JSX + Tailwind to page-exact PDF, with a live-preview dev server.',
      },
      {
        name: 'persistent-logger',
        href: 'https://www.npmjs.com/package/persistent-logger',
        type: 'npm',
        repo: 'persistent-logger',
        npmPackage: 'persistent-logger',
        blurb:
          'Crash-resilient, localStorage-backed browser diagnostics logging, with optional React hooks.',
      },
      {
        name: 'react-toolkit',
        href: 'https://www.npmjs.com/package/@bvandrc/react-toolkit',
        type: 'npm',
        repo: 'react-toolkit',
        npmPackage: '@bvandrc/react-toolkit',
        blurb: 'Generic React hooks and helpers for browser UI behavior.',
      },
      {
        name: 'badgesmith',
        href: 'https://badgesmith.bvandrc.workers.dev/',
        type: 'worker',
        repo: 'badgesmith',
        blurb:
          'Cloudflare Worker that renders several icons and values as one SVG badge, with advanced formatting and live GitHub counts. It draws the badges on this page.',
      },
    ],
  },
  {
    icon: '🎧',
    glyph: { name: 'headphones', color: 'FB64B6' },
    title: 'DJ / Music',
    inReducedContents: false,
    projects: [
      {
        name: 'serato-tools',
        href: 'https://pypi.org/project/serato-tools/',
        type: 'python',
        repo: 'serato-tools',
        pypiPackage: 'serato-tools',
        blurb:
          "Python tools for reading and modifying Serato DJ's tracks, hot cues, waveforms, metadata, crates, and library database.",
      },
      {
        name: 'serato-usb-export',
        href: 'https://pypi.org/project/serato-usb-export/',
        type: 'python',
        repo: 'serato-usb-export',
        pypiPackage: 'serato-usb-export',
        blurb: 'Fast, deduplicated USB export tool for Serato DJ.',
      },
      {
        name: 'mik-automator',
        href: 'https://pypi.org/project/mik-automator/',
        type: 'python',
        repo: 'mik-automator',
        pypiPackage: 'mik-automator',
        blurb: 'Windows automation and database tools for Mixed In Key.',
      },
      {
        name: 'spotify-organizer',
        href: 'https://github.com/bvandrc/SD',
        type: 'python',
        repo: 'SD',
        blurb:
          'Python automation for my 11k+ track DJ library utilizing the Spotify and SoundCloud APIs.',
      },
    ],
  },
  {
    icon: '🔌',
    glyph: { name: 'microchip', color: '00D5BE' },
    title: 'Hardware',
    inReducedContents: false,
    projects: [
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
