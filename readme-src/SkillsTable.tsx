// Badges link: https://github.com/Ileriayo/markdown-badges
// Badge paths are the shields.io static-badge path + params (https://img.shields.io/badge/<path>)
import type { ComponentChildren } from 'preact'

import { SectionTitle } from './SectionHeadings'

type SkillBadge = {
  alt: string
  path: string
  logo: string
  logoColor: string
}

type SkillRow = { label: ComponentChildren; lines: SkillBadge[][] }

type SkillSection = { emoji: string; title: string; rows: SkillRow[] }

const SKILL_SECTIONS: SkillSection[] = [
  {
    emoji: '🖥️🖥️',
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
    emoji: '🧪🧪',
    title: 'Testing',
    rows: [
      {
        label: 'E2E',
        lines: [
          [
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
      {
        label: 'API',
        lines: [
          [
            {
              alt: 'Postman',
              path: 'Postman-FF6C37',
              logo: 'postman',
              logoColor: 'white',
            },
          ],
        ],
      },
    ],
  },
  {
    emoji: '🛠️🛠️',
    title: 'Tools',
    rows: [
      {
        label: 'AI',
        lines: [
          [
            {
              alt: 'Claude',
              path: 'Claude-D97757',
              logo: 'claude',
              logoColor: 'white',
            },
            {
              alt: 'GitHub Copilot',
              path: 'github_copilot-8957E5',
              logo: 'github-copilot',
              logoColor: 'white',
            },
            {
              alt: 'ChatGPT',
              path: 'chatGPT-74aa9c',
              logo: 'openai',
              logoColor: 'white',
            },
            {
              alt: 'Cursor',
              path: 'Cursor-%23000000',
              logo: 'Cursor',
              logoColor: 'white',
            },
            {
              alt: 'Replit',
              path: 'Replit-DD1200',
              logo: 'Replit',
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
        label: (
          <>
            Project
            <br />
            Mgmt.
          </>
        ),
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
    emoji: '📝📝',
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

const Shield = ({ b }: { b: SkillBadge }) => (
  <img
    src={`https://img.shields.io/badge/${b.path}?style=for-the-badge&logo=${b.logo}&logoColor=${b.logoColor}`}
    alt={b.alt}
  />
)

export const SkillsTable = () => (
  <table>
    {SKILL_SECTIONS.map((s) => (
      <>
        <tr>
          <td colspan={2} align="center">
            <SectionTitle emoji={s.emoji} title={s.title} />
          </td>
        </tr>
        {s.rows.map((row) => (
          <tr>
            <td align="right">
              <em>{row.label}</em>
            </td>
            <td align="center">
              {row.lines.map((line, li) => (
                <>
                  {li > 0 && <br />}
                  {line.map((b) => (
                    <Shield b={b} />
                  ))}
                </>
              ))}
            </td>
          </tr>
        ))}
      </>
    ))}
  </table>
)
