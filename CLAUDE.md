## Project

GitHub profile README (the `bvandrc/bvandrc` special repo). `README.md` is **generated** — never edit it directly. The source is `src/`: a Preact TSX document that [tsx-to-pdf](https://github.com/bvandrc/tsx-to-pdf) renders and writes out as Markdown with `pnpm build`.

- **Stack**: TypeScript + Preact, rendered by tsx-to-pdf (`tsx-to-pdf.config.ts`) with `--no-pdf --md`. Biome for lint/format.
- **Layout**: `src/index.tsx` is the document entry and holds the full README content; the tables and shared pieces sit beside it in `src/`.
- **GitHub README constraints**: GitHub strips CSS, `style`, and `class` from README HTML — layout uses sanitizer-allowed attributes only (`align`, `width`, `height`, `colspan`).
- **Markdown vs. HTML**: tsx-to-pdf converts the render to Markdown, which drops those attributes. An element that needs them carries `data-markdown="html"` to be written as HTML whole (the tables, the intro); the centering `<div>` carries `data-markdown="wrap"` to keep its tags around Markdown contents. Everything else (the `##` headings, the stats images) converts to plain Markdown.
- **Workflows**: `ci.yml` is the lint gate and also regenerates + commits README.md (PRs,weekly cron, manual dispatch). `sync-conventions.yml` pulls `conventions/` from the shared conventions repo.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component and JSX rules (the components here are Preact, same rules apply)
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

## Commands

- `pnpm build` — regenerate README.md from `src/`. Run after every `src/` change and commit the result. Its HTML preview lands in the ignored `html/`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: Biome plus `tsc`. Run before every commit; it's what CI runs.

## Conventions

- **Package manager**: pnpm only — never `npm install`, which writes a competing `package-lock.json`.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
