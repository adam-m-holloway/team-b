# Use Vitest for testing

- Status: Accepted
- Date: 2026-11-08
- Deciders: team-b

## Status

Accepted.

## Context and Problem Statement

`@adam-m-holloway/slugify` is a strict TypeScript library that ships as ESM only
(`"type": "module"` in `package.json`, `"module": "NodeNext"` in `tsconfig.json`) and
targets Node 24. Tests are colocated with the source as `src/*.test.ts` and import the
library with ESM-style paths (for example `import { slugify } from "./index.js"` in
`src/slugify.test.ts`). The test runner has to run TypeScript ESM tests like these
without a separate build or transform step. Which test framework should the library
use?

## Decision Drivers

- Runs ESM and TypeScript test files directly, with no Babel or ts-jest transform
- Keeps the dev-dependency list small (currently only `typescript` and `vitest`)
- Familiar, Jest-style test API

## Considered Options

- Vitest
- Jest (with ts-jest)
- node:test

## Decision Outcome

Chosen option: "Vitest", because it runs ESM and TypeScript natively with no Babel or
ts-jest transform, and its API is Jest-compatible.

## Consequences

- Good, because tests run with `vitest run` (`npm test`) and no extra transform
  configuration; the repo has no Vitest config file.
- Good, because the `describe` / `it` / `expect` API is familiar to anyone who knows Jest.
- Bad, because Vitest does not type-check tests, so type errors are only caught by the
  separate `tsc --noEmit` step (`npm run typecheck`), which CI must keep running.
- Bad, because it adds a third-party dev dependency that has to be kept up to date,
  where node:test would have needed none.

## Pros and Cons of the Options

### Vitest

- Good, because it runs ESM and TypeScript natively, with no transform.
- Good, because its API is Jest-compatible.
- Bad, because it is an extra dev dependency and does not type-check on its own.

### Jest (with ts-jest)

- Good, because it is widely used and well known.
- Bad, because it needs a ts-jest (or Babel) transform for TypeScript, and extra setup to
  run ESM, adding dependencies and configuration to this ESM-only repo.

### node:test

- Good, because it is built into Node, so it adds no dependency.
- Bad, because its API is not Jest-compatible, and running TypeScript test files needs
  additional handling rather than working out of the box.
