import { kebabCase } from 'es-toolkit'

import { CountBadge, countBadgeWidth } from './components/CountBadge'
import { REPO_BADGE_WIDTH, RepoBadge } from './components/RepoBadge'
import {
  SectionIconLink,
  SectionTitle,
  sectionIconGap,
} from './components/SectionHeadings'
import { TITLE_BADGE_PAD, TitleBadge } from './components/TitleBadge'
import { TYPE_ICON_PAD, TYPE_ICON_WIDTH, TypeIcon } from './components/TypeIcon'
import { NARROW_VIEWPORT, repoUrl } from './constants'
import { TYPE_ICONS } from './content/project-types'
import type { Project } from './content/projects'
import { PROJECTS } from './content/projects'
import { badgeGap, NBSP_WIDTH } from './lib/badge'

/** `&nbsp;` after the title back when it was text. */
const TEXT_TITLE_GAP = 4

/**
 * Gap between the title and the type icon after it, in px.
 *
 * Narrower than when the title was text: it is a badge now, and carries
 * `TITLE_BADGE_PAD` of its own at both ends, so this only makes up the
 * difference and a reader sees the gap the line has always had. Derived
 * rather than written down because that padding moves with the title's size,
 * which is the dial this whole substitution exists to offer. Drawn as an image
 * rather than `&nbsp;`, so a narrow viewport can close it.
 */
const TITLE_GAP = Math.round(
  badgeGap(TEXT_TITLE_GAP, TITLE_BADGE_PAD) * NBSP_WIDTH
)

/**
 * Height of the blank counterweight, which only its width matters for.
 *
 * Kept under the badges' own so it cannot be what sets the line's height,
 * and it carries no mark to be sized against anything.
 */
const SPACER_HEIGHT = 14

/** `&nbsp;` the type icon sat between back when it was a bare image. */
const TEXT_ICON_GAP = 3

/**
 * `&nbsp;` between the type icon and the badges after it.
 *
 * Fewer than when the icon was an image, for the same reason the title's are:
 * it is a badge now and carries `TYPE_ICON_PAD` at each end.
 */
const ICON_GAP = badgeGap(TEXT_ICON_GAP, TYPE_ICON_PAD)

/**
 * `&nbsp;` between one badge and the next.
 *
 * One, against three elsewhere on the line: both badges carry their own end
 * padding, so the gap a reader sees is about 5px wider than the markup says.
 */
const BADGE_GAP = 1

/** A run of `&nbsp;`; `build.ts` writes the entity back out. */
const Gap = ({ n }: { n: number }) => <>{'\u00a0'.repeat(n)}</>

/**
 * A blank image `width` wide, which a narrow viewport shrinks to nothing.
 *
 * A `<source>`'s own width beats the `<img>`'s where it matches, which is the
 * one way to size anything by viewport once GitHub has stripped the CSS.
 */
const Spacer = ({ width }: { width: number }) => (
  <picture>
    <source
      media={NARROW_VIEWPORT}
      srcset="./assets/spacer.png"
      width={0}
      height={SPACER_HEIGHT}
    />
    <img
      src="./assets/spacer.png"
      width={width}
      height={SPACER_HEIGHT}
      alt=""
    />
  </picture>
)

/**
 * Width of the blank image that counterweights a project's badges.
 *
 * Balancing the title means matching everything to its right against
 * everything to its left, where only the title's own padding cancels, being
 * the same at both of its ends. What is left is the gap after the title, the
 * type icon, the badges, and the gaps between them. Each width is known at
 * build time, so this is exact per project rather than one estimate for all
 * of them — which centres every title instead of an average one.
 *
 * The icon used to be mirrored by a transparent copy of itself on this side.
 * It is a badge now, of a width the same for every type, so the spacer can
 * carry it like everything else rather than the line carrying a second image.
 */
const spacerWidth = (repo: string) => {
  const counts = countBadgeWidth(repo)
  const badges =
    counts > 0
      ? counts + BADGE_GAP * NBSP_WIDTH + REPO_BADGE_WIDTH
      : REPO_BADGE_WIDTH
  return Math.round(
    TITLE_GAP + ICON_GAP * NBSP_WIDTH + TYPE_ICON_WIDTH + badges
  )
}

const ProjectEntry = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  return (
    <p>
      {/* a blank spacer carries the weight of everything right of the title,
          so the title centers on its own text, and a second one is the gap
          after it. The title is a badge rather than bold text: README body
          text is 16px and nothing in the markup can change that, while a badge
          is drawn at whatever size we ask for. Bold and underlined is what
          GitHub makes of a link in bold body text, so it reads as the link it
          is wrapped in.

          On a narrow viewport the title fills the line and the spacers close,
          so it sits alone with the rest of its line wrapped beneath it. That
          is why the gaps are images rather than `&nbsp;`, which would be left
          stranded on a line of their own. The spacers are invisible, but an
          unwrapped README image still links to its own camo URL, so they go
          where the title goes. */}
      <a href={p.href} target="_blank" rel="noopener">
        <Spacer width={spacerWidth(p.repo)} />
        <TitleBadge name={p.name} href={p.href} />
        <Spacer width={TITLE_GAP} />
      </a>
      {/* every image here is wrapped, because GitHub links an unwrapped README
          image to its own camo URL — an asset rather than anywhere useful.
          One anchor each, never one around the group: the spacing between
          them would sit inside it as link text and draw its underline. */}
      <a
        href={icon.published ? p.href : repoUrl(p.repo)}
        target="_blank"
        rel="noopener">
        <TypeIcon type={p.type} />
      </a>
      <Gap n={ICON_GAP} />
      {countBadgeWidth(p.repo) > 0 && (
        <>
          <a href={repoUrl(p.repo)} target="_blank" rel="noopener">
            <CountBadge repo={p.repo} />
          </a>
          <Gap n={BADGE_GAP} />
        </>
      )}
      <a href={repoUrl(p.repo)} target="_blank" rel="noopener">
        <RepoBadge />
      </a>
      <br />
      {p.blurb}
      {p.screenshot && (
        <>
          <br />
          <a href={p.href} target="_blank" rel="noopener">
            <img
              src={p.screenshot}
              width="385"
              alt={`${p.name} — screenshot preview`}
            />
          </a>
        </>
      )}
    </p>
  )
}

/** Every project section, laid out as centered paragraphs (relies on the README's centered wrapper). */
export const Projects = () => (
  <>
    {/* contents line: jump links to each section's anchor */}
    <p>
      {PROJECTS.map((s, i) => {
        const href = `#${kebabCase(s.title)}`
        // the icon is left out of the link that follows it, so the underline
        // covers the section's name and nothing else
        return (
          <>
            {i > 0 && ' · '}
            <SectionIconLink icon={s.icon} href={href} />
            {sectionIconGap(s.icon)}
            <a href={href}>{s.title}</a>
          </>
        )
      })}
    </p>
    {PROJECTS.map((s) => (
      <>
        {/* GitHub doesn't add anchors to raw HTML headings, so the contents line targets this id */}
        <SectionTitle id={kebabCase(s.title)} icon={s.icon} title={s.title} />
        {s.intro && (
          <p>
            <em>
              <strong>{s.intro}</strong>
            </em>
          </p>
        )}
        {s.projects.map((p) => (
          <ProjectEntry p={p} />
        ))}
      </>
    ))}
  </>
)
