import { kebabCase, mapValues } from 'es-toolkit'

import { CountBadge, countBadgeWidth } from './CountBadge'
import { ICON_GRAY, repoUrl, TYPE_ICON_HEIGHT } from './constants'
import { TYPE_ICONS } from './content/project-types'
import type { Project } from './content/projects'
import { PROJECTS } from './content/projects'
import { REPO_BADGE_WIDTH, RepoBadge } from './RepoBadge'
import { SectionIcon, SectionTitle } from './SectionHeadings'
import { TITLE_BADGE_PAD, TitleBadge } from './TitleBadge'

/** Width of one `&nbsp;` in GitHub's README body font, in px. */
const NBSP = 4.5

/** `&nbsp;` the title sat between back when it was text. */
const TEXT_TITLE_GAP = { before: 3, after: 4 }

/**
 * `&nbsp;` on each side of the project title.
 *
 * Fewer than when the title was text: it is a badge now, and carries
 * `TITLE_BADGE_PAD` of its own at both ends, so these only make up the
 * difference and a reader sees the gaps the line has always had. Derived
 * rather than written down because that padding moves with the title's size,
 * which is the dial this whole substitution exists to offer.
 */
const TITLE_GAP = mapValues(TEXT_TITLE_GAP, (count) =>
  Math.max(0, Math.round((count * NBSP - TITLE_BADGE_PAD) / NBSP))
)

/** `&nbsp;` between the type icon and the badges after it. */
const ICON_GAP = 3

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
 * Width of the blank image that counterweights a project's badges.
 *
 * Balancing the title means matching everything to its right against
 * everything to its left, where the type icon cancels against its transparent
 * twin and the title's own padding cancels against itself, leaving the badges,
 * the gap before the icon, and whatever the title's two gaps differ by. Each
 * width is known at build time, so this is exact per project rather than one
 * estimate for all of them — which centres every title instead of an average
 * one.
 */
const spacerWidth = (repo: string) => {
  const counts = countBadgeWidth(repo)
  const badges =
    counts > 0 ? counts + BADGE_GAP * NBSP + REPO_BADGE_WIDTH : REPO_BADGE_WIDTH
  const gaps = TITLE_GAP.after - TITLE_GAP.before + ICON_GAP
  return Math.round(gaps * NBSP + badges)
}

const ProjectEntry = ({ p }: { p: Project }) => {
  const icon = TYPE_ICONS[p.type]
  const iconUrl = (color: string) =>
    `https://cdn.simpleicons.org/${icon.slug}/${color}`
  const spacer = spacerWidth(p.repo)
  const typeIcon = (
    <img
      src={iconUrl(ICON_GRAY)}
      height={TYPE_ICON_HEIGHT}
      alt={icon.title}
      title={icon.title}
    />
  )
  return (
    <p>
      {/* a fully transparent copy of the icon balances it, so the title
          centers on its own text, and a blank spacer carries the badges'
          weight, which have no twin to mirror them. Both are invisible but
          an unwrapped README image still links to its own camo URL, so they
          go where the title goes. One anchor holds the pair, which is what
          keeps them touching — a space between would widen this side. */}
      <a href={p.href} target="_blank" rel="noopener">
        <img src={iconUrl('00000000')} height={TYPE_ICON_HEIGHT} alt="" />
        <img
          src="./assets/spacer.png"
          width={spacer}
          height={TYPE_ICON_HEIGHT}
          alt=""
        />
      </a>
      <Gap n={TITLE_GAP.before} />
      {/* the title is a badge rather than bold text: README body text is 16px
          and nothing in the markup can change that, while a badge is drawn at
          whatever size we ask for. Bold and underlined is what GitHub makes of
          a link in bold body text, so it reads as the link it is wrapped in. */}
      <a href={p.href} target="_blank" rel="noopener">
        <TitleBadge name={p.name} />
      </a>
      <Gap n={TITLE_GAP.after} />
      {/* every image here is wrapped, because GitHub links an unwrapped README
          image to its own camo URL — an asset rather than anywhere useful.
          One anchor each, never one around the group: the spacing between
          them would sit inside it as link text and draw its underline. */}
      <a
        href={icon.published ? p.href : repoUrl(p.repo)}
        target="_blank"
        rel="noopener">
        {typeIcon}
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
      {PROJECTS.map((s, i) => (
        <>
          {i > 0 && ' · '}
          <a href={`#${kebabCase(s.title)}`}>
            <SectionIcon icon={s.icon} />
            &nbsp;{s.title}
          </a>
        </>
      ))}
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
