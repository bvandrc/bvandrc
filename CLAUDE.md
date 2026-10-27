## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `src/`: Preact TSX rendered to sanitizer-safe HTML by `pnpm build`.

- **Stack**: TypeScript + Preact (`preact-render-to-string`), run with `tsx`. Biome for lint/format.
- **Layout**: `src/index.tsx` is the full README content; `scripts/build.ts` cleans it up and writes `README.md`.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Workflows**: `ci.yml` is the lint gate, and fails when the committed README.md differs from what `pnpm build` generates. `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `src/`. Run after every `src/` change and commit the result — CI checks it is current.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm only — never `npm install`, which writes a competing `package-lock.json`.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
