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
  // the badge group's anchor has to hug its contents: whitespace inside it
  // renders as spaces, which would widen the right side the title is centred
  // against and underline the gaps on hover. Only anchors holding nothing but
  // images and nbsp are touched, which leaves the screenshots' alone — theirs
  // sit on their own lines where the space does not show.
  .replace(/<a href="[^"]*"[^>]*>[\s\S]*?<\/a>/g, (anchor) =>
    // only anchors holding nothing but these images and nbsp, which leaves
    // the screenshots' alone: theirs sit on their own lines, where the space
    // does not show
    /^<a href="[^"]*"[^>]*>(?:\s|&nbsp;|<img src="(?:https:\/\/(?:multi-icon-badge|cdn\.simpleicons\.org)|\.\/assets\/spacer\.png)[^>]*\/>)+<\/a>$/.test(
      anchor
    )
      ? anchor
          .replace(/>\s+</g, '><')
          .replace(/;\s+</g, ';<')
          .replace(/>\s+&/g, '>&')
      : anchor
  )
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
