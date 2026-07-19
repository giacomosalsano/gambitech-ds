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

> **Status:** Foundation & tooling phase. No UI components are published yet.
> See [`docs/ai/EPICS.md`](docs/ai/EPICS.md) for the roadmap.

## Requirements

- Node.js >= 20
- pnpm (managed via Corepack)

## Getting started

```bash
pnpm install
```

### Scripts

| Script                 | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `pnpm dev`             | Start Storybook (primary component workbench). |
| `pnpm dev:playground`  | Start the Next.js playground app.              |
| `pnpm build`           | Build the library with tsup (`dist/`).         |
| `pnpm build-storybook` | Build the static Storybook site.               |
| `pnpm typecheck`       | Run the TypeScript compiler in no-emit mode.   |
| `pnpm lint`            | Run ESLint.                                    |
| `pnpm format`          | Format the repository with Prettier.           |
| `pnpm test`            | Run unit tests with Vitest.                    |
| `pnpm test:e2e`        | Run Playwright interaction/a11y tests.         |
| `pnpm changeset`       | Record a versioned change.                     |

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
  lib/          Shared utilities (cn, ...)
  styles/       Design tokens (globals.css)
.storybook/     Storybook (Vite) configuration
playground/     Private Next.js app for local development (not published)
docs/           Architecture, engineering and AI planning docs
  adr/          Architecture Decision Records
tests/          Playwright end-to-end tests
```

## License

[MIT](LICENSE)
