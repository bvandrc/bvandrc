/**
 * @fileoverview general intro/summary. Includes comment for GitHub bio that is manually
 * set as well, for version control reasons.
 */


/**
 * GitHub Bio - Set manually at https://github.com/settings/profile (160 char limit),
 * but here for version control: 
 *
 * Prev: Software test engineer and developer experienced in Typescript / JS, React, Python,
 * Node.js, and various testing frameworks.

 * New: Software test engineer and React developer in Denver. I build React web apps and publish
 * TypeScript tools to test them.
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
