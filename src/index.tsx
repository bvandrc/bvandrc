import type { VNode } from 'preact'
import { render as renderBase } from 'preact-render-to-string/jsx'

import { Lines } from './Lines'
import { ProjectsTable } from './ProjectsTable'
import { SectionHeader } from './SectionHeadings'
import { SkillsTable } from './SkillsTable'

const render = (node: VNode) =>
  renderBase(node, {}, { pretty: '  ', jsx: false })

/** The README's markdown, with each component rendered to HTML. */
export const readmeContent = `<div align="center">

${render(
  // INTRO
  <p>
    <Lines
      lines={[
        'SDET, React developer, TypeScript purist.',
        '9 years writing code and tests, from hardware to web apps.',
        'I build React apps, testing and CI npm packages, and Python DJ tools.',
        "These days I build with AI agents, reviewing and refining every PR until it's code I understand and would write.",
        "Most of what's here started as something I needed and couldn't find.",
      ]}
    />
  </p>
  /**
   * GitHub Bio - Set manually at https://github.com/settings/profile (160 char limit),
   * but here for version control:
   *
   * SDET, React developer, TypeScript purist. 9 years writing code and tests.
   * I build React apps, Python DJ tools, and npm packages for testing and CI.
   */
)}

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

${render(
  // BEYOND CODE
  <>
    <p>When I'm not coding, you'll find me:</p>
    <p>
      <Lines
        lines={[
          '🎧 DJing 🎧',
          '🚴 Bike Riding to explore Denver 🚴',
          '⛷️ Hitting the slopes with friends ⛷️',
          '✈️ Exploring my neighborhood, Colorado, and the world! ✈️',
          '🎬 Checking out good movies 🎬',
          '🎵 Catching live music 🎵',
        ]}
      />
    </p>
  </>
)}

</div>
`
