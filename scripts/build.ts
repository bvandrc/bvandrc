import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readmeContent } from '../src/index'

const md = `<!-- GENERATED FILE — do not edit directly. Edit src/ and run \`pnpm build\` -->

${readmeContent}`

/** A newline and the indent the pretty-printer starts the next line with. */
const NEWLINE = String.raw`\n\s*`

/** A run of `&nbsp;`, which is all the spacing a README line can express. */
const NBSP_RUN = '(?:&nbsp;)+'

/** The blank image that spaces a title line where `&nbsp;` cannot. */
const SPACER_SRC = String.raw`\.\/assets\/spacer\.png`

/** A global regex from source fragments, so the patterns here can be shared. */
const re = (source: string) => new RegExp(source, 'g')

/**
 * An element from its opening tag through its closing one, as a regex source.
 *
 * `attrs` follows the tag name, and matches any attributes by default.
 * `content` matches anything by default, and lazily, so a match stops at the
 * first closing tag.
 */
const element = (
  tag: string,
  { attrs = '[^>]*', content = String.raw`[\s\S]*?` } = {}
) => `<${tag}${attrs}>${content}<\\/${tag}>`

/** A self-closing tag as the renderer writes one, as a regex source. */
const voidElement = (tag: string, attrs = '[^>]*') => `<${tag}${attrs}\\/>`

/** An anchor's attributes, from its `href` on. */
const LINK_ATTRS = ' href="[^"]*"[^>]*'

/** An image on a title line: a badge, or a spacer. */
const LINE_IMG = voidElement(
  'img',
  String.raw` src="(?:https:\/\/badgesmith|${SPACER_SRC})[^>]*`
)

/**
 * Drops the whitespace between tags, and between a tag and an `&nbsp;`, which
 * would otherwise render as spaces beside the images either side of it.
 */
const hug = (html: string) => html.replace(/([>;])\s+(?=[<&])/g, '$1')

const output = md
  // the renderer emits raw U+00A0 for JSX &nbsp; entities — write them back as
  // explicit entities so the spacing is visible in source and immune to
  // whitespace-normalizing tools
  .replaceAll('\u00A0', '&nbsp;')
  // the pretty-printer's newlines around inline content render as extra
  // spaces — join nbsp runs to whatever the printer set them beside, and
  // <strong> tags to their content, so title lines render with exact spacing
  .replace(re(`${NEWLINE}(${NBSP_RUN})(?:${NEWLINE})?(?=\\S)`), '$1')
  .replace(re(`(${NBSP_RUN})${NEWLINE}(?=<a )`), '$1')
  .replace(re(`(<strong>)${NEWLINE}|${NEWLINE}(<\\/strong>)`), '$1$2')
  // a <picture> renders the text nodes between its children, so the newlines
  // the printer puts around <source> and <img> would come out as spaces
  // beside the image. Nothing else belongs in one, so it hugs its contents.
  .replace(re(element('picture')), hug)
  // an anchor holding nothing but a title line's images and nbsp has to hug
  // its contents: whitespace inside it renders as spaces, which would widen
  // the side the title is centred against and underline the gaps on hover.
  // That leaves the screenshots' anchors alone, since theirs sit on their own
  // lines, where the space does not show.
  .replace(re(element('a', { attrs: LINK_ATTRS })), (anchor) =>
    new RegExp(
      `^${element('a', {
        attrs: LINK_ATTRS,
        content: `(?:\\s|&nbsp;|${LINE_IMG}|${element('picture', {
          content: `(?:${voidElement('source')})+${LINE_IMG}`,
        })})+`,
      })}$`
    ).test(anchor)
      ? hug(anchor)
      : anchor
  )
  // the title's anchor ends in the gap after it, drawn as an image, so the
  // newline the printer leaves before the next anchor would render as a
  // second gap beside it
  .replace(
    re(
      `(${voidElement('img', ` src="${SPACER_SRC}"[^>]*`)}<\\/picture><\\/a>)\\s+(?=<a )`
    ),
    '$1'
  )
  // a jump link that the printer wrapped onto lines of its own would underline
  // the space its newlines render as, so it hugs its contents too
  .replace(/(<a href="#[^"]*">)\s+([\s\S]*?)\s+<\/a>/g, '$1$2</a>')
  // a contents-line logo links to the same place as the name beside it, and
  // the badge's own end padding is the whole gap between them. The printer
  // leaves a newline and a blank line there, which would render as a space on
  // top of that padding — and a blank line inside a <p> ends the HTML block.
  .replace(
    re(
      `(${element('a', { attrs: ' href="(#[^"]*)"', content: voidElement('img') })})\\s+(?=<a href="\\2">)`
    ),
    '$1'
  )

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
writeFileSync(join(root, 'README.md'), output)
console.log('README.md generated')
