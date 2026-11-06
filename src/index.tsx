import type { VNode } from 'preact'
import { render as renderBase } from 'preact-render-to-string/jsx'

import { Lines } from './components/Lines'
import { SectionHeader } from './components/SectionHeadings'
import { BEYOND_CODE, INTRO_LINES } from './content/about'
import { SECTIONS } from './content/sections'
import { Projects } from './Projects'
import { SkillsTable } from './SkillsTable'

const render = (node: VNode) =>
  renderBase(node, {}, { pretty: '  ', jsx: false })

/** The README's markdown, with each component rendered to HTML. */
export const readmeContent = `<div align="center">

${render(
  // INTRO
  <p>
    <Lines lines={INTRO_LINES} />
  </p>
  /**
   * GitHub Bio - Set manually at https://github.com/settings/profile (160 char limit),
   * but here for version control:
   *
   * SDET, React developer, TypeScript purist. 9 years writing code and tests.
   * I build React apps, Python DJ tools, and npm packages for testing and CI.
   */
)}

${SectionHeader(SECTIONS.PROJECTS.icon, SECTIONS.PROJECTS.title)}

${render(<Projects />)}

${SectionHeader(SECTIONS.SKILLS.icon, SECTIONS.SKILLS.title)}

${render(<SkillsTable />)}

${SectionHeader(SECTIONS.STATS.icon, SECTIONS.STATS.title)}

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

${SectionHeader(SECTIONS.BEYOND_CODE.icon, SECTIONS.BEYOND_CODE.title)}

${render(
  // BEYOND CODE
  <>
    <p>{BEYOND_CODE.intro}</p>
    <p>
      <Lines lines={BEYOND_CODE.lines} />
    </p>
  </>
)}

</div>
`
