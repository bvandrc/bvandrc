import type { ComponentChildren } from 'preact'
import { SectionTitle } from './components'

export type SkillBadge = { alt: string; path: string }

export type SkillRow = { label: ComponentChildren; lines: SkillBadge[][] }

export type SkillSection = { emoji: string; title: string; rows: SkillRow[] }

const Shield = ({ b }: { b: SkillBadge }) => (
  <img src={`https://img.shields.io/badge/${b.path}`} alt={b.alt} />
)

export const SkillsTable = ({ sections }: { sections: SkillSection[] }) => (
  <table>
    {sections.map((s) => (
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
              {row.lines.map((line, li) => (
                <>
                  {li > 0 && <br />}
                  {line.map((b, bi) => (
                    <>
                      {bi > 0 && ' '}
                      <Shield b={b} />
                    </>
                  ))}
                </>
              ))}
            </td>
          </tr>
        ))}
      </>
    ))}
  </table>
)
