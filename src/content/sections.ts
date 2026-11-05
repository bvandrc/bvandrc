/** A top-level section's heading: an emoji, shown on both sides, and its title. */
export type SectionHeading = { icon: string; title: string }

/** The README's top-level sections, in page order. */
export const SECTIONS = {
  PROJECTS: { icon: '🌟', title: 'Projects' },
  SKILLS: { icon: '⚡', title: 'Skills' },
  STATS: { icon: '📈', title: 'Stats' },
  BEYOND_CODE: { icon: '🎉', title: 'Beyond Code' },
} satisfies Record<string, SectionHeading>
