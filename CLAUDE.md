## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `src/index.tsx` is the full README content; `scripts/build.ts` cleans it up and writes `README.md`.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Count badges**: `src/CountBadge.tsx` renders each project's commit and PR totals as a single SVG from the [multi-icon-badge](https://github.com/bvandrc/multi-icon-badge) worker, with the numbers baked into the URL rather than looked up when the image loads. The badge is inline rather than `align="right"`: GitHub's markdown CSS pads every `img[align=right]` by 20px, so a floated badge can never sit flush. It carries no background (`color=none`), so `BADGE_FG` has to supply its own contrast — a mid grey legible on GitHub's light and dark themes alike, which no pill colour could manage.
- **Counts are generated, and fetched outside the build**: the numbers live in `src/generated/repo-counts.ts`, which is **generated — never edit it by hand**. `pnpm gen:counts` rewrites it from the GitHub API and `refresh-counts.yml` runs that weekly, rebuilds, and commits both. The fetch is deliberately not part of `pnpm build`, because CI diffs the committed README against a fresh build: the build has to render the same bytes from the same commit, while these numbers change on their own. A repo with no entry renders no badge rather than a made-up number, which is what a private repo does until `REPO_READ_TOKEN` is configured — the built-in Actions token reaches every public repo but no private one.
- **Workflows**: `ci.yml` is the lint gate, and fails when the committed README.md differs from what `pnpm build` generates. `refresh-counts.yml` refreshes the repo counts weekly and commits the result. `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

- @conventions/typescript.md — language-level TypeScript/JavaScript rules
- @conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
- @conventions/all.md — practice for every repo: branches, formatting, writing, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `src/`. Run after every `src/` change and commit the result — CI checks it is current.
- `pnpm gen:counts` — rewrite `src/generated/repo-counts.ts` from the GitHub API. Reads `GITHUB_TOKEN`; needs one granted the private repos to refresh those. Run `pnpm build` after it, since the counts are baked into the README.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm only — never `npm install`, which writes a competing `package-lock.json`.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
