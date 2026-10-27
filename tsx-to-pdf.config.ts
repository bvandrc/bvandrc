import type { Config } from 'tsx-to-pdf'

export default {
  entry: './src/index.tsx',
  // README.md lands at the root; the HTML preview beside it goes to the ignored html/.
  outDir: '.',
  name: 'README',
} satisfies Config
