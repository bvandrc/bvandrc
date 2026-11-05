import { kebabCase } from 'es-toolkit'

import { CountBadge, countBadgeWidth } from './CountBadge'
import { ICON_GRAY, repoUrl, TYPE_ICON_HEIGHT } from './constants'
import { TYPE_ICONS } from './content/project-types'
import type { Project } from './content/projects'
import { PROJECTS } from './content/projects'
import { REPO_BADGE_WIDTH, RepoBadge } from './RepoBadge'
import { SectionIcon, SectionTitle } from './SectionHeadings'

/** Width of one `&nbsp;` in GitHub's README body font, in px. */
const NBSP = 4.5

/** `&nbsp;` between the project title and its type icon. */
const TITLE_GAP = 4 * NBSP

/**
 * `&nbsp;` between one badge and the next.
 *
 * One, against three elsewhere on the line: both badges carry their own end
 * padding, so the gap a reader sees is about 5px wider than the markup says.
 */
const BADGE_GAP = 1 * NBSP

/**
 * Width of the blank image that counterweights a project's badges.
 *
 * Balancing the title means matching everything to its right, where the type
 * icon and the gap before the badges cancel against the left, leaving the
 * badges themselves and the gap that opens before the icon. Each width is
 * known at build time, so this is exact per project rather than one estimate
 * for all of them — which centres every title instead of an average one.
 */
const spacerWidth = (repo: string) => {
  const counts = countBadgeWidth(repo)
  const badges =
    counts > 0 ? counts + BADGE_GAP + REPO_BADGE_WIDTH : REPO_BADGE_WIDTH
  return Math.round(TITLE_GAP + badges)
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
      &nbsp;&nbsp;&nbsp;
      <strong>
        <a href={p.href} target="_blank" rel="noopener">
          {p.name}
        </a>
      </strong>
      {/* one more than the gap after the icon, which the badge's own left
          padding widens by about 6px, so the icon sits evenly between the two */}
      &nbsp;&nbsp;&nbsp;&nbsp;
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
      &nbsp;&nbsp;&nbsp;
      {countBadgeWidth(p.repo) > 0 && (
        <>
          <a href={repoUrl(p.repo)} target="_blank" rel="noopener">
            <CountBadge repo={p.repo} />
          </a>
          &nbsp;
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
