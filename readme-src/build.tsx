import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { render } from 'preact-render-to-string/jsx'

import { BeyondCode } from './BeyondCode'
import { ProjectsTable } from './ProjectsTable'
import { SectionHeader } from './SectionHeadings'
import { SkillsTable } from './SkillsTable'

const PREACT_RENDER_ARGS = { pretty: '  ', jsx: false }

const skillsTable = render(<SkillsTable />, {}, PREACT_RENDER_ARGS)
const projectsTable = render(<ProjectsTable />, {}, PREACT_RENDER_ARGS)
const beyondCode = render(<BeyondCode />, {}, PREACT_RENDER_ARGS)

const md = `<!-- GENERATED FILE — do not edit directly. Edit readme-src/ and run \`pnpm build\` -->

<div align="center">

<!-- GitHub bio (set manually at https://github.com/settings/profile, 160 char limit):
Software test engineer and React developer in Denver. I build React web apps and publish TypeScript tools to test them.
-->

Software test engineer and React developer in Denver.<br/>
8 years in test engineering, 5 in software QA, 4 building React.<br/>
I build React web apps and publish TypeScript tools to test them, plus the occasional Python or Arduino project.<br/>
Most of what's here started as something I needed and couldn't find.

${SectionHeader('🌟', 'Skills')}

${skillsTable}

${SectionHeader('💎', 'Projects')}

${projectsTable}

${SectionHeader('📈', 'Stats')}

<!-- https://github.com/anuraghazra/github-readme-stats -->
<img src="./github-overall-stats.svg" alt="Overall Stats"><br/>

<!-- https://github.com/DenverCoder1/github-readme-streak-stats -->
<!-- ![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=bvandrc&theme=merko&background=00000000&exclude_days=true&hide_border=false&hide_current_streak=true&hide_longest_streak=true) -->

<!-- https://github.com/bvandrc/github-repository-contribution-stats -->
<img src="./github-contribution-stats.svg" alt="Repo Contributions"><br/>

<!--  ![Contribution Graph](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=bvandrc&theme=github_dark) -->

<!-- https://github.com/lowlighter/metrics -->
<!-- TODO: see why this has higher numbers, and contribute fixes to the other repos -->
<!-- <img src="./github-metrics.svg" alt="GitHub Metrics"><br/> -->

<!-- [![StackOverflow Stats](https://github-readme-stackoverflow.vercel.app/?userID=11149305&layout=compact&theme=dark)](https://stackoverflow.com/users/11149305/bvandercar) -->

${SectionHeader('🎉', 'Beyond Code')}

${beyondCode}

</div>
`

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// the renderer emits raw U+00A0 for JSX &nbsp; entities — write them back as
// explicit entities so the spacing is visible in source and immune to
// whitespace-normalizing tools
const output = md
  .replaceAll('\u00A0', '&nbsp;')
  // the pretty-printer's newlines around inline content render as extra
  // spaces — join nbsp separator lines and <strong> tags to their content so
  // title lines render with main's exact spacing
  .replace(/\n\s*((?:&nbsp;)+)\n\s*/g, '$1')
  .replace(/<strong>\n\s*/g, '<strong>')
  .replace(/\n\s*<\/strong>/g, '</strong>')
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
