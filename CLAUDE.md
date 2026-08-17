## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `readme-src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `readme-src/ProjectsTable.tsx`, `SkillsTable.tsx`, and `BeyondCode.tsx` each contain a section component plus its data; `SectionHeadings.tsx`, `constants.ts`, and `utils.ts` hold the shared pieces; `build.tsx` assembles the sections and writes `README.md`.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Workflows**: `ci.yml` is the lint gate and also regenerates + commits README.md (PRs,weekly cron, manual dispatch). `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `readme-src/`. Run after every `readme-src/` change and commit the result.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
