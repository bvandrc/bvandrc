import type { SkillSection } from './SkillsTable'

// Badge paths are the shields.io static-badge path + params (https://img.shields.io/badge/<path>)
// Badges link: https://github.com/Ileriayo/markdown-badges
export const SKILL_SECTIONS: SkillSection[] = [
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
              path: 'typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
            },
            {
              alt: 'React',
              path: 'react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
            },
            {
              alt: 'JavaScript',
              path: 'javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
            },
          ],
          [
            {
              alt: 'HTML5',
              path: 'html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
            },
            {
              alt: 'CSS',
              path: 'css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white',
            },
            {
              alt: 'Python',
              path: 'python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
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
              path: 'node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
            },
            {
              alt: 'Vite',
              path: 'vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white',
            },
            {
              alt: 'Biome',
              path: 'biome-%2360A5FA.svg?style=for-the-badge&logo=biome&logoColor=white',
            },
            {
              alt: 'ESLint',
              path: 'ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white',
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
              path: 'zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white',
            },
            {
              alt: 'TailwindCSS',
              path: 'tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
            },
            {
              alt: 'JQuery',
              path: 'jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white',
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
              path: 'Accessibility-%230170EA.svg?style=for-the-badge&logo=Accessibility&logoColor=white',
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
              path: '-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e',
            },
            {
              alt: 'Selenium',
              path: '-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white',
            },
            {
              alt: 'Puppeteer',
              path: 'Puppeteer-%2340B5A4.svg?style=for-the-badge&logo=Puppeteer&logoColor=black',
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
              path: '-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B',
            },
            {
              alt: 'Jest',
              path: '-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white',
            },
            {
              alt: 'Testing Library',
              path: '-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white',
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
              path: 'Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
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
              path: 'Claude-D97757?style=for-the-badge&logo=claude&logoColor=white',
            },
            {
              alt: 'GitHub Copilot',
              path: 'github_copilot-8957E5?style=for-the-badge&logo=github-copilot&logoColor=white',
            },
            {
              alt: 'ChatGPT',
              path: 'chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white',
            },
            {
              alt: 'Cursor',
              path: 'Cursor-%23000000?style=for-the-badge&logo=Cursor&logoColor=white',
            },
            {
              alt: 'Replit',
              path: 'Replit-DD1200?style=for-the-badge&logo=Replit&logoColor=white',
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
              path: 'github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white',
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
              path: 'jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white',
            },
            {
              alt: 'Confluence',
              path: 'confluence-%23172BF4.svg?style=for-the-badge&logo=confluence&logoColor=white',
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
              path: '-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white',
            },
          ],
        ],
      },
    ],
  },
]
