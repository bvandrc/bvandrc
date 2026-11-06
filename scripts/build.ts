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
  // a <picture> renders the text nodes between its children, so the newlines
  // the printer puts around <source> and <img> would come out as spaces
  // beside the image. Nothing else belongs in one, so it hugs its contents.
  .replace(/<picture>[\s\S]*?<\/picture>/g, (picture) =>
    picture.replace(/>\s+</g, '><')
  )
  // the badge group's anchor has to hug its contents: whitespace inside it
  // renders as spaces, which would widen the right side the title is centred
  // against and underline the gaps on hover. Only anchors holding nothing but
  // images and nbsp are touched, which leaves the screenshots' alone — theirs
  // sit on their own lines where the space does not show.
  .replace(/<a href="[^"]*"[^>]*>[\s\S]*?<\/a>/g, (anchor) =>
    // only anchors holding nothing but these images and nbsp, which leaves
    // the screenshots' alone: theirs sit on their own lines, where the space
    // does not show
    /^<a href="[^"]*"[^>]*>(?:\s|&nbsp;|<img src="(?:https:\/\/badgesmith|\.\/assets\/spacer\.png)[^>]*\/>|<picture>(?:<source[^>]*\/>)+<img src="(?:https:\/\/badgesmith|\.\/assets\/spacer\.png)[^>]*\/><\/picture>)+<\/a>$/.test(
      anchor
    )
      ? anchor
          .replace(/>\s+</g, '><')
          .replace(/;\s+</g, ';<')
          .replace(/>\s+&/g, '>&')
      : anchor
  )
  // the title's anchor ends in the gap after it, drawn as an image, so the
  // newline the printer leaves before the next anchor would render as a
  // second gap beside it
  .replace(
    /(<img src="\.\/assets\/spacer\.png"[^>]*\/><\/picture><\/a>)\s+(?=<a )/g,
    '$1'
  )
  // a jump link that the printer wrapped onto lines of its own would underline
  // the space its newlines render as, so it hugs its contents too
  .replace(/(<a href="#[^"]*">)\s+([\s\S]*?)\s+<\/a>/g, '$1$2</a>')
  // a contents-line logo links to the same place as the name beside it, and
  // the badge's own end padding is the whole gap between them. The printer
  // leaves a newline and a blank line there, which would render as a space on
  // top of that padding — and a blank line inside a <p> ends the HTML block.
  .replace(/(<a href="(#[^"]*)"><img[^>]*\/><\/a>)\s+(?=<a href="\2">)/g, '$1')
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
