import type { VNode } from 'preact'
import { render as renderBase } from 'preact-render-to-string/jsx'

import { BeyondCode } from './BeyondCode'
import { Intro } from './Intro'
import { ProjectsTable } from './ProjectsTable'
import { SectionHeader } from './SectionHeadings'
import { SkillsTable } from './SkillsTable'

const render = (node: VNode) =>
  renderBase(node, {}, { pretty: '  ', jsx: false })

/** The README's markdown, with each component rendered to HTML. */
export const readmeContent = `<div align="center">

${render(<Intro />)}

${SectionHeader('🌟', 'Skills')}

${render(<SkillsTable />)}

${SectionHeader('💎', 'Projects')}

${render(<ProjectsTable />)}

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

${render(<BeyondCode />)}

</div>
`
