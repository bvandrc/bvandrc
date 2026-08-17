## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `readme-src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build:readme`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `readme-src/ProjectsTable.tsx` and `readme-src/SkillsTable.tsx` each contain a table component plus its section data; `components.tsx` holds the shared pieces; `build.tsx` assembles the sections and writes `README.md`.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`). Commit/PR count badges are shields.io images (octicons embedded as base64 data URIs); private repos can't use live badges, so they get static counts via `counts` instead of `repo`.
- **Workflows**: `generate-readme.yml` regenerates README.md on PRs and weekly; `generate-github-stats.yml` refreshes the stats SVGs daily (don't hand-edit `github-*.svg`); `ci.yml` is the lint gate; `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

## Commands

- `pnpm build:readme` — regenerate README.md from `readme-src/`. Run after every `readme-src/` change and commit the result.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
