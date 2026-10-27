/**
 * @fileoverview general intro/summary. Includes comment for GitHub bio that is manually
 * set as well, for version control reasons.
 */

/**
 * GitHub Bio - Set manually at https://github.com/settings/profile (160 char limit),
 * but here for version control:
 *
 * Software test engineer, React developer, TypeScript connoisseur. I build React apps,
 * write Python tools, and publish npm packages for testing and CI.
 */

const INTRO_LINES = [
  'Software test engineer, React developer, TypeScript connoisseur.',
  '9 years writing code, 8 in test, 5 in software QA, 4 building React.',
  'I build React apps, publish testing and CI packages to npm, and write Python tools for my music library.',
  "Most of what's here started as something I needed and couldn't find.",
]

export const Intro = () => (
  <p>
    {INTRO_LINES.map((line, i) => (
      <>
        {i > 0 && <br />}
        {line}
      </>
    ))}
  </p>
)
