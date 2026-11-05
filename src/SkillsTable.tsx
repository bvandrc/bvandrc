import type { SkillBadge } from './content/skills'
import { SKILLS } from './content/skills'
import { Lines } from './Lines'
import { HeadingBadge } from './SectionHeadings'

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
            <HeadingBadge icon={s.icon} title={s.title} />
          </td>
        </tr>
        {s.rows.map((row) => (
          <tr>
            <td align="right">
              <em>
                <Lines lines={row.label.split('\n')} />
              </em>
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
