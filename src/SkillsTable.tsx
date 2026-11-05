import type { ComponentChildren } from 'preact'

import { SKILLS } from './content/skills'
import { Lines } from './Lines'
import { SectionTitle } from './SectionHeadings'

type SkillBadge = {
  alt: string
  path: string
  logo: string
  logoColor: string
}

type SkillRow = { label: ComponentChildren; lines: SkillBadge[][] }

export type SkillSection = { emoji: string; title: string; rows: SkillRow[] }

const Shield = ({ b }: { b: SkillBadge }) => (
  <img
    src={`https://img.shields.io/badge/${b.path}?style=for-the-badge&logo=${b.logo}&logoColor=${b.logoColor}`}
    alt={b.alt}
  />
)

export const SkillsTable = () => (
  <table>
    {SKILLS.map((s) => (
      <>
        <tr>
          <td colspan={2} align="center">
            <SectionTitle emoji={s.emoji} title={s.title} />
          </td>
        </tr>
        {s.rows.map((row) => (
          <tr>
            <td align="right">
              <em>{row.label}</em>
            </td>
            <td align="center">
              <Lines
                lines={row.lines.map((line) =>
                  line.map((b) => <Shield b={b} />)
                )}
              />
            </td>
          </tr>
        ))}
      </>
    ))}
  </table>
)
