/**
 * A top-level section's heading: an emoji, shown on both sides, and its title.
 *
 * `glyph` is the icon bvandercar.dev draws in the emoji's place, as an Iconify
 * name: Lucide's unless prefixed (`material-symbols:...`). The README can't
 * draw it, so a section the site doesn't show leaves it out.
 */
export type SectionHeading = { icon: string; glyph?: string; title: string }

/**
 * The icon bvandercar.dev draws in place of a group heading's emoji.
 *
 * `name` is an Iconify name, as for `SectionHeading['glyph']`, and `color` a
 * hex colour without the `#`, as for a `SectionLogo`.
 */
export type GroupGlyph = { name: string; color: string }

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
