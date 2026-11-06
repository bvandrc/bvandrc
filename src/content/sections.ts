/**
 * A top-level section's heading: an emoji, shown on both sides, and its title.
 *
 * `glyph` is the icon bvandercar.dev draws in the emoji's place, as an Iconify
 * name: Lucide's unless prefixed (`material-symbols:...`). The README can't
 * draw it, so a section the site doesn't show leaves it out.
 */
export type SectionHeading = { icon: string; glyph?: string; title: string }

/** A group glyph's color on bvandercar.dev, by name; the site maps each to its own shade. */
export type GlyphColor =
  | 'amber'
  | 'brown'
  | 'green'
  | 'sky'
  | 'violet'
  | 'yellow'

/**
 * The icon bvandercar.dev draws in place of a group heading's emoji.
 *
 * `name` is an Iconify name, as for `SectionHeading['glyph']`.
 */
export type GroupGlyph = { name: string; color: GlyphColor }

/** The README's top-level sections, in page order. */
export const SECTIONS = {
  PROJECTS: {
    icon: '🌟',
    glyph: 'material-symbols:deployed-code-outline',
    title: 'Projects',
  },
  SKILLS: { icon: '⚡', glyph: 'wrench', title: 'Skills' },
  STATS: { icon: '📈', title: 'Stats' },
  BEYOND_CODE: { icon: '🎉', glyph: 'party-popper', title: 'Beyond Code' },
} satisfies Record<string, SectionHeading>
