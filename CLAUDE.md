## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `src/index.tsx` is the full README content; `scripts/build.ts` cleans it up and writes `README.md`.
  - **Content**: the intro, each top-level section's heading emoji and title, the project and skill lists, each project type's icon and title, and the "Beyond Code" lines are plain data in `src/content/`.
  - **Sections**: `index.tsx`, `Projects.tsx`, and `SkillsTable.tsx` render that content. They're the page's sections and stay at the source root; everything they render with is a component in `src/components/`.
- **`src/content/` is shared**: [bvandercar.dev](https://github.com/bvandrc/bvandercar.dev) fetches `src/content/*.ts` and `src/generated/repo-counts.ts` at build time and type-checks them.
  - **Plain TypeScript**: no JSX, and no imports beyond each other; each file declares the types of its own data.
  - **Shape changes**: one there breaks that site's build until it follows.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Count badges**: `src/components/CountBadge.tsx` renders each project's counts as a single SVG from the [badgesmith](https://github.com/bvandrc/badgesmith) worker.
  - **What it shows**: the project's commit total, its merged PRs where `showsPrs` in `src/content/counts.ts` says they tell a review story (many, and most of its commits), and its all-time downloads where it publishes to npm or PyPI. Which counts it shows, in what order, and their icons and nouns are `COUNT_KINDS` in `src/content/counts.ts`, which bvandercar.dev's project cards read too.
  - **Numbers**: baked into the URL rather than looked up when the image loads. Counts of 1000 or more are shortened (`70.3K`), with the exact numbers in the alt and hover text.
  - **Width**: each title's spacer balances it, and it's measured at build time by the `badgesmith` npm package's renderer, the same one the worker runs, so bump that package when the worker's layout changes.
  - **Inline**: rather than `align="right"`, since GitHub's markdown CSS pads every `img[align=right]` by 20px, so a floated badge can never sit flush.
  - **Colour**: it carries no background (`color=none`), so `BADGE_FG` has to supply its own contrast — a mid grey legible on GitHub's light and dark themes alike, which no pill colour could manage.
- **Counts are generated, and fetched outside the build**: the numbers live in `src/generated/repo-counts.ts`, which is **generated — never edit it by hand**.
  - **Fetch**: `pnpm gen:counts` rewrites it from the GitHub API, plus npm's or pepy.tech's for the all-time downloads of any project with an `npmPackage` or `pypiPackage`. A PyPI count stops two days back, where bvandercar.dev's BigQuery count does, since its deploy fails on a count under the profile's. `refresh-counts.yml` runs that weekly, rebuilds, and commits both.
  - **Not in the build**: CI diffs the committed README against a fresh build, so the build has to render the same bytes from the same commit, while these numbers change on their own.
  - **Missing counts**: a repo with no entry renders no badge rather than a made-up number. A private repo has none until `REPO_READ_TOKEN` is configured, since the built-in Actions token reaches every public repo but no private one.
- **Workflows**:
  - `ci.yml` is the lint gate, and fails when the committed README.md differs from what `pnpm build` generates.
  - `refresh-counts.yml` refreshes the repo counts weekly and commits the result.
  - `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

- @conventions/typescript.md — language-level TypeScript/JavaScript rules
- @conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
- @conventions/all.md — practice for every repo: branches, formatting, writing, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `src/`. Run after every `src/` change and commit the result — CI checks it is current.
- `pnpm gen:counts` — rewrite `src/generated/repo-counts.ts` from the GitHub, npm, and pepy.tech APIs. Run `pnpm build` after it, since the counts are baked into the README.
  - **`GITHUB_TOKEN`**: read for the GitHub API; needs one granted the private repos to refresh those.
  - **`PEPY_API_KEY`**: read for PyPI downloads, which keep their committed numbers without it.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm only — never `npm install`, which writes a competing `package-lock.json`.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
