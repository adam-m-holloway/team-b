# @adam-m-holloway/slugify

Turn any string into a URL-safe slug. Strict TypeScript, ESM only, no runtime
dependencies.

## Usage

```ts
import { slugify } from "@adam-m-holloway/slugify";

slugify("Hello World");                    // "hello-world"
slugify("Crème Brûlée");                   // "creme-brulee"
slugify("  --Hello, World!--  ");          // "hello-world"
slugify("hello world", { maxLength: 6 });  // "hello"  (never ends on "-")
slugify("hello", { maxLength: 0 });        // throws RangeError
```

What it does:

1. Strips diacritics: NFKD normalisation, then combining marks are removed.
2. Lowercases the string.
3. Collapses every run of characters that aren't `a-z` or `0-9` into one `-`.
4. Trims leading and trailing `-`.
5. If you pass `maxLength`, truncates the slug and trims any trailing `-` left by
   the cut. `maxLength` must be a positive integer; anything else throws
   `RangeError`.

## Development

Requires Node 24.

```sh
npm ci              # install
npm run typecheck   # tsc --noEmit
npm test            # vitest run
npm run build       # tsc -> dist/
```

CI runs `npm ci`, `npx tsc --noEmit` and `npx vitest run` on every pull request
and on every push to `main`. Dependabot opens weekly updates for npm and GitHub
Actions.

Architecture decisions are recorded in [`docs/adr/`](docs/adr/).

## Claude Code plugins

This repo gets its Claude Code skills from the
[agent marketplace](https://adam-m-holloway.github.io/agent-marketplace/)
(that link is the catalogue of every plugin).

| | |
|---|---|
| **Channel** | **stable**: marketplace `agent-marketplace-stable`, git ref `stable` |
| **Plugins** | `adr-helper` (writes ADRs into `docs/adr/`), `typescript-conventions` |
| **Config**  | [`.claude/settings.json`](.claude/settings.json) |

The `stable` ref only moves when someone promotes a reviewed `main` commit, so
this repo doesn't pick up a plugin change the moment it merges to `main`.
Claude Code installs the plugins when you open the repo and trust the folder.

### How a promotion reaches you

After a promotion PR merges in the marketplace repo, refresh the catalogue and
then update each plugin:

```sh
claude plugin marketplace update agent-marketplace-stable
claude plugin update adr-helper@agent-marketplace-stable
claude plugin update typescript-conventions@agent-marketplace-stable
```

### Switching to the latest channel

The latest channel (`agent-marketplace`) follows the marketplace's `main`
branch. Use it to try a change before it's promoted. In
`.claude/settings.json`:

1. Rename the key under `extraKnownMarketplaces` from `agent-marketplace-stable`
   to `agent-marketplace`, and remove `ref` and `path` from its `source`.
2. Change every `enabledPlugins` suffix from `@agent-marketplace-stable` to
   `@agent-marketplace`.

```json
{
  "extraKnownMarketplaces": {
    "agent-marketplace": {
      "source": { "source": "github", "repo": "adam-m-holloway/agent-marketplace" }
    }
  },
  "enabledPlugins": {
    "adr-helper@agent-marketplace": true,
    "typescript-conventions@agent-marketplace": true
  }
}
```

To switch back, reverse both steps.

## License

MIT. See [LICENSE](LICENSE).
