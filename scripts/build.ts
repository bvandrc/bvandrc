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
  // and nbsp the printer set at the start or end of a line, beside an image
  .replace(/\n\s*((?:&nbsp;)+)(?=\S)/g, '$1')
  .replace(/((?:&nbsp;)+)\n\s*(?=<a )/g, '$1')
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
    /^<a href="[^"]*"[^>]*>(?:\s|&nbsp;|<img src="(?:https:\/\/(?:badgesmith|cdn\.simpleicons\.org)|\.\/assets\/spacer\.png)[^>]*\/>)+<\/a>$/.test(
      anchor
    )
      ? anchor
          .replace(/>\s+</g, '><')
          .replace(/;\s+</g, ';<')
          .replace(/>\s+&/g, '>&')
      : anchor
  )
  // a <picture>, and a <sub> holding nothing but one, render the text nodes
  // between their children — so the newlines the printer leaves around them
  // would come out as spaces beside the image. Both hug their contents.
  .replace(/<(picture|sub)>[\s\S]*?<\/\1>/g, (wrapper, tag: string) =>
    tag === 'picture' ||
    /^<sub>\s*<picture>[\s\S]*<\/picture>\s*<\/sub>$/.test(wrapper)
      ? wrapper.replace(/>\s+</g, '><')
      : wrapper
  )
  // a jump link that the printer wrapped onto lines of its own would underline
  // the space its newlines render as, so it hugs its contents too
  .replace(/(<a href="#[^"]*">)\s+([\s\S]*?)\s+<\/a>/g, '$1$2</a>')
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
