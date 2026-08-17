/*
 * The GitHub bio is a profile setting, not part of this repo — set it manually at
 * https://github.com/settings/profile (160 char limit). Recorded here so its
 * wording stays next to the intro it should match:
 *
 *   Software test engineer and React developer in Denver. I build React web apps
 *   and publish TypeScript tools to test them.
 */

const INTRO_LINES = [
  'Software test engineer and React developer in Denver.',
  '8 years in test engineering, 5 in software QA, 4 building React.',
  'I build React web apps and publish TypeScript tools to test them, plus the occasional Python or Arduino project.',
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
