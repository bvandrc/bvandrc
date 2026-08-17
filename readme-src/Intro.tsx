const GITHUB_BIO =
  'Software test engineer and React developer in Denver. I build React web apps and publish TypeScript tools to test them.'

/**
 * Records the GitHub bio, which is a profile setting rather than part of this
 * repo, so its wording lives alongside the intro it should match.
 *
 * Preact has no comment node, so this is a plain string rather than JSX.
 */
export const BIO_COMMENT = `<!-- GitHub bio (set manually at https://github.com/settings/profile, 160 char limit):
${GITHUB_BIO}
-->`

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
