# @gambitech/ds

Gambitech Design System — a standalone, themeable React component library for
Next.js 15+, React 19 and Tailwind CSS v4.

It is distributed in two complementary ways:

- **Shadcn custom registry** — copy components into a consumer project via
  `npx shadcn add`, keeping full ownership of the source.
- **npm package** — `import { ... } from "@gambitech/ds"` for teams that prefer
  a versioned dependency.

Theming relies exclusively on CSS variables (Tailwind v4 tokens). Rebranding is
done by overriding tokens in the consumer's `globals.css` — never by editing
component internals, and never with hardcoded hex colors.

> **Status:** Epic 5 complete. Next: Epic 6 (first npm release). See
> [`docs/ai/EPICS.md`](docs/ai/EPICS.md) for the roadmap.

## Requirements

- Node.js >= 22.13
- pnpm (managed via Corepack)

## Getting started

```bash
pnpm install
```

### Scripts

| Script                   | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `pnpm dev`               | Start Storybook (primary component workbench).                  |
| `pnpm dev:playground`    | Start the Next.js playground app.                               |
| `pnpm build`             | Build the library with tsdown (`dist/`).                        |
| `pnpm registry:sync`     | Regenerate nested registry catalogs from `src/` folders.        |
| `pnpm build:registry`    | Sync + generate static shadcn registry JSON under `public/r/`.  |
| `pnpm registry:validate` | Sync + validate the source registry (and includes) with shadcn. |
| `pnpm registry:smoke`    | End-to-end `shadcn add` smoke against a local registry server.  |
| `pnpm build-storybook`   | Build the static Storybook site.                                |
| `pnpm typecheck`         | Run the TypeScript compiler in no-emit mode.                    |
| `pnpm lint`              | Run ESLint.                                                     |
| `pnpm format`            | Format the repository with Prettier.                            |
| `pnpm test`              | Run unit tests with Vitest in watch mode.                       |
| `pnpm test:run`          | Run unit tests once (used in CI).                               |
| `pnpm test:ui`           | Run unit tests with the Vitest UI.                              |
| `pnpm test:e2e`          | Run Playwright interaction/a11y tests.                          |
| `pnpm changeset`         | Record a versioned change.                                      |

## Consuming via npm

```bash
pnpm add @gambitech/ds
```

```ts
import { Button } from "@gambitech/ds";
```

## Consuming via shadcn registry

After the registry JSON is hosted (or served locally from `public/r/`), add the
namespace to the consumer `components.json`:

```json
{
  "registries": {
    "@gambitech": "https://example.com/r/{name}.json"
  }
}
```

Then install items (dependencies resolve automatically):

```bash
npx shadcn@latest add @gambitech/button
npx shadcn@latest add @gambitech/app-shell
```

Public GitHub installs (source `registry.json` at repo root) also work once this
branch is on the default remote:

```bash
npx shadcn@latest add giacomosalsano/gambitech-ds/button
```

Local verification in this repo (uses an OS temp consumer; does not touch
`pnpm-lock.yaml`):

```bash
pnpm registry:smoke
```

## Consuming the tokens

```css
/* consumer globals.css */
@import "@gambitech/ds/styles.css";

:root {
  --primary: oklch(0.55 0.2 260); /* rebrand by overriding tokens */
}
```

## Repository layout

```
src/            Library source (published package)
  components/
    ui/         Primitives (src/components/ui/<name>/) + registry.json
    composites/ Domain-agnostic composites + registry.json
  lib/          Shared utilities/types + registry.json
  styles/       Design tokens (globals.css) + registry.json
  test/         Test-only helpers and mocks (not published, not in the registry)
registry.json   Root shadcn registry (composes nested registries via include)
scripts/        Tooling (e.g. sync-registry.mjs)
public/r/       Generated registry JSON (`pnpm build:registry`, gitignored)
.storybook/     Storybook (Vite) configuration
playground/     Private Next.js app for local development (not published)
docs/           Architecture, engineering and AI planning docs
  adr/          Architecture Decision Records
  ai/           EPICS tracking and AI workflow docs (docs/ai/EPICS.md)
tests/          Playwright end-to-end tests
```

## License

[MIT](LICENSE)
