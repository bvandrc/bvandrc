import type { SectionLogo } from '../content/projects'
import { badgeGap, badgePad, badgeSrc } from '../lib/badge'

/**
 * Heading fills, by the theme each is meant for.
 *
 * `LIGHT` is GitHub's own body text colour, which is what a heading should
 * read as. `DARK` is not its counterpart: a `<picture>` matches on
 * `prefers-color-scheme`, which follows the reader's OS rather than the theme
 * GitHub is painting, so this variant can land on a white page. Near-white
 * there is 1.09:1 — invisible — so the dark branch is chosen for how it reads
 * on its own canvas first, and only held back from near-white far enough to
 * survive the wrong one: 9.63:1 on the dark canvas against 1.96:1 on white.
 * That is well under what even a heading would want on white, and deliberate
 * — that canvas is the one this has to survive, not the one it is for. It is
 * close to the floor, though: near-white was 1.09:1 there, so there is not
 * much room left before the mismatch reads as the ghost it was.
 *
 * Its own constant rather than the grey the type icons use: those are a plain
 * `<img>` with one colour for both canvases, so they cannot spend contrast on
 * white the way a variant that only lands there by accident can.
 *
 * The light branch keeps true black, which leaves one combination short: a
 * reader who pins GitHub to dark while their system says light. Every
 * arrangement of a media query strands one of the two mismatches, and this is
 * the one chosen to strand.
 */
const FG = { LIGHT: '1f2328', DARK: 'B1BAC4' }

/**
 * Box a section title is drawn in, and the size of the text inside it.
 *
 * The box is what the badge is measured and aligned by; the text size is set
 * apart from it, so the title can read larger than a 24px box would otherwise
 * allow. 20 is just under what that box can hold before the edges would cut
 * the descenders, which the renderer refuses outright.
 */
const HEADING_BADGE_HEIGHT = 24
const HEADING_FONT_SIZE = 20

/** Height of a section logo in an `<h3>` title, matching an emoji's. */
const TITLE_LOGO_HEIGHT = 20

/** `&nbsp;` a section logo sat between back when it was a bare image. */
const TEXT_LOGO_GAP = { contents: 1, title: 4 }

/**
 * Height of a section logo on the contents line.
 *
 * A pixel under body text, which a logo would otherwise overshoot: it fills
 * its box to the edges where a letter leaves room above and below.
 */
const CONTENTS_LOGO_HEIGHT = 15

/** A markdown `##` section heading with the emoji + nbsp spacing applied. */
export const SectionHeader = (emoji: string, title: string) =>
  `## ${emoji}&nbsp; ${title} &nbsp;${emoji}`

/**
 * A section's emoji, or its logo in its brand colour.
 *
 * The logo comes from the same renderer as every other mark in here rather
 * than from a second host, which is one fewer place for the README's images
 * to come from and one registry that decides what a slug means. Nothing is
 * padded into it: a bare `<img>` sat on the baseline, and a badge whose
 * contents fill it sits exactly where that did.
 */
export const SectionIcon = ({
  icon,
  height = CONTENTS_LOGO_HEIGHT,
}: {
  icon: string | SectionLogo
  height?: number
}) =>
  typeof icon === 'string' ? (
    icon
  ) : (
    // decorative: the section's title always sits beside it
    <img
      src={badgeSrc({
        items: [{ icon: icon.slug }],
        color: icon.color,
        height,
      })}
      height={height}
      alt=""
    />
  )

/**
 * The `&nbsp;` run between a section's icon and the title beside it.
 *
 * An emoji is text and takes the gap as written. A logo is a badge that pads
 * itself, so its run is shortened by that padding — which at the contents
 * line's size already exceeds the one space there, leaving none to write.
 */
const iconGap = (icon: string | SectionLogo, count: number, height: number) =>
  '\u00a0'.repeat(
    typeof icon === 'string' ? count : badgeGap(count, badgePad(height))
  )

/**
 * A contents-line icon, carrying a link only where it has to.
 *
 * GitHub links an unwrapped README image to its own camo URL, so a logo takes
 * an anchor back to its section. An emoji is text and needs none — and reads
 * better without one, since the link's underline then starts at the words
 * instead of running under the mark and the gap before them.
 */
export const SectionIconLink = ({
  icon,
  href,
}: {
  icon: string | SectionLogo
  href: string
}) =>
  typeof icon === 'string' ? (
    <SectionIcon icon={icon} />
  ) : (
    <a href={href}>
      <SectionIcon icon={icon} />
    </a>
  )

/** The gap after a section's icon on the contents line. */
export const sectionIconGap = (icon: string | SectionLogo) =>
  iconGap(icon, TEXT_LOGO_GAP.contents, CONTENTS_LOGO_HEIGHT)

/** An `<h3>` subsection title, flanked by its icon on each side. */
export const SectionTitle = ({
  id,
  icon,
  title,
}: {
  id?: string
  icon: string | SectionLogo
  title: string
}) => {
  const mark = <SectionIcon icon={icon} height={TITLE_LOGO_HEIGHT} />
  // GitHub links an unwrapped README image to its own camo URL, so a logo
  // links back to this heading instead.
  const flank =
    typeof icon === 'string' ? mark : <a href={id && `#${id}`}>{mark}</a>
  const gap = iconGap(icon, TEXT_LOGO_GAP.title, TITLE_LOGO_HEIGHT)
  return (
    <h3 id={id}>
      {flank}
      {gap}
      {title}
      {gap}
      {flank}
    </h3>
  )
}

/**
 * Gap between a section's emoji and its title, inside the badge.
 *
 * Four of them come to 22.2px at this size, a little under what separated the
 * two before the emoji moved inside: out there the `&nbsp;` runs and the
 * badge's own end padding both did it, and in here only these are left to.
 *
 * Non-breaking, because SVG collapses a run of ordinary spaces to one when it
 * draws — and nothing in the badge can stop that, since `xml:space` is ignored
 * for an SVG embedded in a page and the CSS that works is an inline style,
 * which the proxy serving these forbids. The renderer measures them as spaces,
 * which is what they advance as.
 */
const HEADING_GAP = '\u00a0'.repeat(4)

/**
 * A section title drawn as a badge, emoji and all.
 *
 * Holding the emoji inside the badge is what keeps the two on one line. Drawn
 * beside it they could not be: an image aligns by its bottom edge while a
 * badge centres its text in its box, so the two sat 6px apart however they
 * were sized. In here the emoji is text like the rest, laid out by the same
 * renderer, and it takes the title's size rather than the size of whatever
 * element happens to surround it.
 *
 * Heading text is near-black on one theme and near-white on the other, which
 * one image cannot be — so it ships both and lets the reader's browser pick,
 * which GitHub's sanitizer allows for exactly this. The emoji is unaffected:
 * a reader's emoji font draws it in its own colours either way.
 */
export const HeadingBadge = ({
  icon,
  title,
}: {
  icon: string
  title: string
}) => {
  const src = (color: string) =>
    badgeSrc({
      items: [{ value: `${icon}${HEADING_GAP}${title}${HEADING_GAP}${icon}` }],
      color,
      height: HEADING_BADGE_HEIGHT,
      bold: true,
      font: 'arial',
      fontSize: HEADING_FONT_SIZE,
    })
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset={src(FG.DARK)} />
      {/* the emoji is decorative; the title is the heading */}
      <img src={src(FG.LIGHT)} height={HEADING_BADGE_HEIGHT} alt={title} />
    </picture>
  )
}
