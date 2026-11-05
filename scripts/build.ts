import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readmeContent } from '../src/index'

const md = `<!-- GENERATED FILE — do not edit directly. Edit src/ and run \`pnpm build\` -->

${readmeContent}`

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
  // the badge's link has to hug it: whitespace inside an inline anchor
  // renders as a space, which would underline a gap beside the badge and
  // widen the right side the title is centred against
  .replace(
    /<a href="([^"]*)">\s*(<img src="https:\/\/multi-icon-badge[^>]*\/>)\s*<\/a>/g,
    '<a href="$1">$2</a>'
  )
  // the two counterweights must touch for the same reason: a space between
  // them would widen the left side and pull the title off centre
  .replace(/\n\s*(?=<img src="\.\/assets\/spacer\.png")/g, '')
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
