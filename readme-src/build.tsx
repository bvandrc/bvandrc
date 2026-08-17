import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { render } from 'preact-render-to-string'
import { ProjectsTable } from './ProjectsTable'
import { SkillsTable } from './SkillsTable'
import { PROJECT_SECTIONS } from './projects'
import { SKILL_SECTIONS } from './skills'

const skills = render(<SkillsTable sections={SKILL_SECTIONS} />)
const projects = render(<ProjectsTable sections={PROJECT_SECTIONS} />)

const md = `<!-- GENERATED FILE — do not edit directly. Edit readme-src/ and run \`npm run build:readme\` -->

<div align="center">

## 🌟&nbsp; Skills &nbsp;🌟

${skills}

## 💎&nbsp; Projects &nbsp;💎

${projects}

## 📈&nbsp; Stats &nbsp;📈

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

## 🎉&nbsp; Beyond Code &nbsp;🎉

When I'm not coding, you'll find me:

🎧 DJing 🎧  
🚴 Bike Riding to explore Denver 🚴  
⛷️ Hitting the slopes with friends ⛷️  
✈️ Exploring my neighborhood, Colorado, and the world! ✈️  
🎬 Checking out good movies 🎬  
🎵 Catching live music 🎵

</div>
`

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
writeFileSync(join(root, 'README.md'), md)
console.log('README.md generated')
