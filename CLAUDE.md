# CLAUDE.md — team-b

## What this repo is

`@adam-m-holloway/slugify`: a small strict-TypeScript library exposing
`slugify(input, { maxLength? })`. ESM only, Node 24, no runtime dependencies.

- Source: `src/slugify.ts` (re-exported from `src/index.ts`)
- Tests: Vitest, colocated as `src/*.test.ts`
- Dev dependencies are only `typescript` and `vitest`. Don't add others.

## Commands

| Task      | Command                                   |
|-----------|-------------------------------------------|
| Install   | `npm ci`                                  |
| Typecheck | `npm run typecheck` (`tsc --noEmit`)      |
| Test      | `npm test` (`vitest run`)                 |
| Build     | `npm run build` (`tsc` → `dist/`)         |

CI (`.github/workflows/ci.yml`, job `ci`) runs `npm ci`, `npx tsc --noEmit` and
`npx vitest run`. Run both checks locally before committing.

## Conventions

- `tsconfig.json` is `strict` with `noUncheckedIndexedAccess` and
  `exactOptionalPropertyTypes`. No `any`.
- Write the test first.
- Conventional Commits (`feat:`, `fix:`, `test:`, `chore:`, `ci:`, `docs:`).
- Architecture decisions are recorded as ADRs in `docs/adr/`.

## Claude Code plugins

This repo uses the **stable** channel of the agent marketplace
(`agent-marketplace-stable`, git ref `stable`), with `adr-helper` and
`typescript-conventions` enabled in `.claude/settings.json`.
