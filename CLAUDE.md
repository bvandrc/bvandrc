## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `src/index.tsx` is the full README content; `scripts/build.ts` cleans it up and writes `README.md`. The intro, each top-level section's heading emoji and title, the project and skill lists, each project type's icon and title, and the "Beyond Code" lines are plain data in `src/content/`, rendered by `index.tsx`, `Projects.tsx`, and `SkillsTable.tsx`. Those three are the page's sections and stay at the source root; everything they render with is a component in `src/components/`.
- **`src/content/` is shared**: [bvandercar.dev](https://github.com/bvandrc/bvandercar.dev) fetches `src/content/*.ts` and `src/generated/repo-counts.ts` at build time and type-checks them, so keep them plain TypeScript: no JSX, and no imports beyond each other (each file declares the types of its own data). A shape change there breaks that site's build until it follows.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Count badges**: `src/components/CountBadge.tsx` renders each project's commit and PR totals, plus its all-time downloads where it publishes to npm or PyPI, as a single SVG from the [badgesmith](https://github.com/bvandrc/badgesmith) worker, with the numbers baked into the URL rather than looked up when the image loads. Counts of 1000 or more are shortened (`70.3K`), with the exact numbers in the alt and hover text. Which counts it shows, in what order, and their icons and nouns are `COUNT_KINDS` in `src/content/counts.ts`, which bvandercar.dev's project cards read too. The badge's width, which each title's spacer balances, is measured at build time by the `badgesmith` npm package's renderer, the same one the worker runs, so bump that package when the worker's layout changes. The badge is inline rather than `align="right"`: GitHub's markdown CSS pads every `img[align=right]` by 20px, so a floated badge can never sit flush. It carries no background (`color=none`), so `BADGE_FG` has to supply its own contrast — a mid grey legible on GitHub's light and dark themes alike, which no pill colour could manage.
- **Counts are generated, and fetched outside the build**: the numbers live in `src/generated/repo-counts.ts`, which is **generated — never edit it by hand**. `pnpm gen:counts` rewrites it from the GitHub API, plus npm's or pepy.tech's for the all-time downloads of any project with an `npmPackage` or `pypiPackage`, and `refresh-counts.yml` runs that weekly, rebuilds, and commits both. The fetch is deliberately not part of `pnpm build`, because CI diffs the committed README against a fresh build: the build has to render the same bytes from the same commit, while these numbers change on their own. A repo with no entry renders no badge rather than a made-up number, which is what a private repo does until `REPO_READ_TOKEN` is configured — the built-in Actions token reaches every public repo but no private one.
- **Workflows**: `ci.yml` is the lint gate, and fails when the committed README.md differs from what `pnpm build` generates. `refresh-counts.yml` refreshes the repo counts weekly and commits the result. `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

- @conventions/typescript.md — language-level TypeScript/JavaScript rules
- @conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
- @conventions/all.md — practice for every repo: branches, formatting, writing, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `src/`. Run after every `src/` change and commit the result — CI checks it is current.
- `pnpm gen:counts` — rewrite `src/generated/repo-counts.ts` from the GitHub, npm, and pepy.tech APIs. Reads `GITHUB_TOKEN`; needs one granted the private repos to refresh those. Reads `PEPY_API_KEY` for PyPI downloads, which keep their committed numbers without it. Run `pnpm build` after it, since the counts are baked into the README.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm only — never `npm install`, which writes a competing `package-lock.json`.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
