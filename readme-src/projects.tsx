import { type ProjectSection, RepoLink } from './components'

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
