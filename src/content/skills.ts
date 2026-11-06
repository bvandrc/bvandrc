import type { GroupGlyph } from './sections'

// Badges link: https://github.com/Ileriayo/markdown-badges
// Badge paths are the shields.io static-badge path + params (https://img.shields.io/badge/<path>)

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

export type SkillSection = {
  icon: string
  /** The site's glyph for the heading, drawn in place of the emoji. */
  glyph: GroupGlyph
  title: string
  rows: SkillRow[]
}

export const SKILLS: SkillSection[] = [
  {
    icon: '🖥️',
    glyph: { name: 'code-xml', color: '00BCFF' },
    title: 'Core Development',
    rows: [
      {
        label: 'Languages',
        lines: [
          [
            {
              alt: 'TypeScript',
              path: 'typescript-%23007ACC.svg',
              logo: 'typescript',
              logoColor: 'white',
            },
            {
              alt: 'React',
              path: 'react-%2320232a.svg',
              logo: 'react',
              logoColor: '%2361DAFB',
            },
            {
              alt: 'JavaScript',
              path: 'javascript-%23323330.svg',
              logo: 'javascript',
              logoColor: '%23F7DF1E',
            },
          ],
          [
            {
              alt: 'HTML5',
              path: 'html5-%23E34F26.svg',
              logo: 'html5',
              logoColor: 'white',
            },
            {
              alt: 'CSS',
              path: 'css-%23663399.svg',
              logo: 'css',
              logoColor: 'white',
            },
            {
              alt: 'Python',
              path: 'python-3670A0',
              logo: 'python',
              logoColor: 'ffdd54',
            },
          ],
        ],
      },
      {
        label: 'Dev Tools',
        lines: [
          [
            {
              alt: 'Node.js',
              path: 'node.js-339933',
              logo: 'nodedotjs',
              logoColor: 'white',
            },
            {
              alt: 'Vite',
              path: 'vite-%23646CFF.svg',
              logo: 'vite',
              logoColor: 'white',
            },
            {
              alt: 'Biome',
              path: 'biome-%2360A5FA.svg',
              logo: 'biome',
              logoColor: 'white',
            },
            {
              alt: 'ESLint',
              path: 'ESLint-4B3263',
              logo: 'eslint',
              logoColor: 'white',
            },
          ],
        ],
      },
      {
        label: 'Libraries',
        lines: [
          [
            {
              alt: 'Zod',
              path: 'zod-%233068b7.svg',
              logo: 'zod',
              logoColor: 'white',
            },
            {
              alt: 'TailwindCSS',
              path: 'tailwindcss-%2338B2AC.svg',
              logo: 'tailwind-css',
              logoColor: 'white',
            },
            {
              alt: 'shadcn/ui',
              path: 'shadcn%2Fui-000000',
              logo: 'shadcnui',
              logoColor: 'white',
            },
            {
              alt: 'JQuery',
              path: 'jquery-%230769AD.svg',
              logo: 'jquery',
              logoColor: 'white',
            },
          ],
        ],
      },
      {
        label: 'Skills',
        lines: [
          [
            {
              alt: 'Accessibility',
              path: 'Accessibility-%230170EA.svg',
              logo: 'Accessibility',
              logoColor: 'white',
            },
          ],
        ],
      },
    ],
  },
  {
    icon: '🧪',
    glyph: { name: 'test-tube-diagonal', color: '05DF72' },
    title: 'Testing',
    rows: [
      {
        label: 'E2E',
        lines: [
          [
            {
              alt: 'Playwright',
              path: '-Playwright-%232EAD33',
              logo: 'playwright',
              logoColor: 'white',
            },
            {
              alt: 'Cypress',
              path: '-cypress-%23E5E5E5',
              logo: 'cypress',
              logoColor: '058a5e',
            },
            {
              alt: 'Selenium',
              path: '-selenium-%43B02A',
              logo: 'selenium',
              logoColor: 'white',
            },
            {
              alt: 'Puppeteer',
              path: 'Puppeteer-%2340B5A4.svg',
              logo: 'Puppeteer',
              logoColor: 'black',
            },
          ],
        ],
      },
      {
        label: 'Unit',
        lines: [
          [
            {
              alt: 'Vitest',
              path: '-Vitest-252529',
              logo: 'vitest',
              logoColor: 'FCC72B',
            },
            {
              alt: 'Jest',
              path: '-jest-%23C21325',
              logo: 'jest',
              logoColor: 'white',
            },
            {
              alt: 'Testing Library',
              path: '-TestingLibrary-%23E33332',
              logo: 'testing-library',
              logoColor: 'white',
            },
          ],
        ],
      },
    ],
  },
  {
    icon: '🛠️',
    glyph: { name: 'hammer', color: 'FFB900' },
    title: 'Tools',
    rows: [
      {
        label: 'AI',
        lines: [
          [
            {
              alt: 'Claude Code',
              path: 'Claude_Code-D97757',
              logo: 'claude',
              logoColor: 'white',
            },
            {
              alt: 'GitHub Copilot',
              path: 'github_copilot-8957E5',
              logo: 'github-copilot',
              logoColor: 'white',
            },
          ],
        ],
      },
      {
        label: 'CI / CD',
        lines: [
          [
            {
              alt: 'GitHub Actions',
              path: 'github%20actions-%232671E5.svg',
              logo: 'githubactions',
              logoColor: 'white',
            },
          ],
        ],
      },
      {
        label: 'Project\nMgmt.',
        lines: [
          [
            {
              alt: 'Jira',
              path: 'jira-%230A0FFF.svg',
              logo: 'jira',
              logoColor: 'white',
            },
            {
              alt: 'Confluence',
              path: 'confluence-%23172BF4.svg',
              logo: 'confluence',
              logoColor: 'white',
            },
          ],
        ],
      },
    ],
  },
  {
    icon: '📝',
    glyph: { name: 'braces', color: 'C4B5FD' },
    title: 'Other Languages',
    rows: [
      {
        label: 'Hardware',
        lines: [
          [
            {
              alt: 'Arduino',
              path: '-Arduino-00979D',
              logo: 'Arduino',
              logoColor: 'white',
            },
          ],
        ],
      },
    ],
  },
]
