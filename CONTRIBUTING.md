# Contributing to @gambitech/ds

This guide describes how components are authored and reviewed. It complements
the architecture and engineering rules in `docs/ai/architecture.mdc` and
`docs/ai/engineering.mdc`.

## Prerequisites

- Node.js >= 22.13
- pnpm (via Corepack)

```bash
pnpm install
pnpm dev            # Storybook (primary workbench)
pnpm dev:playground # Next.js playground
```

## Component authoring conventions

### Foundation

Primitives are built on **Radix UI**, styled with **Tailwind v4 tokens** and
**CVA** for variants. We adapt the canonical shadcn "new-york" source (MIT) to
our tokens and naming — see `docs/adr/0001` and `docs/adr/0004`.

### Rules

- **Tokens only.** Use semantic CSS variables (`bg-primary`,
  `text-muted-foreground`, ...). Never hardcode hex colors.
- **Domain-agnostic names.** No product-specific terms in public APIs
  (`docs/adr/0002`).
- **Explicit named exports.** Re-export each component from `src/index.ts`.
- **`cn` for class composition.** Import from `@/lib/utils`.
- **i18n-ready.** Components render no hardcoded user-facing copy; text is
  passed via props/children. Examples default to pt-BR.

### File layout (folder per component)

```
src/components/ui/<name>/
  <name>.tsx           # implementation
  <name>.stories.tsx   # Storybook stories (light + dark via addon-themes)
  <name>.test.tsx      # unit tests (Vitest + RTL)
  index.ts             # explicit exports for this component
```

Then re-export from `src/index.ts`.

## Testing

| Command         | What it runs                                  |
| --------------- | --------------------------------------------- |
| `pnpm test`     | Unit tests (Vitest + RTL, jsdom). Runs in CI. |
| `pnpm test:e2e` | Playwright E2E against the built Storybook.   |

`test:e2e` needs a browser once:

```bash
pnpm exec playwright install chromium
```

**Story/interaction tests** use `@storybook/addon-themes` (light/dark toggle)
and `@storybook/addon-vitest` (Test panel in the Storybook UI). The browser-mode
Vitest runner that executes stories as tests will be wired together with the
first primitive in Epic 2, once the Vitest 4 Playwright provider is pinned and
`chromium` is installed. Until then, run stories interactively via `pnpm dev`.

## Definition of Done (per component)

A component is complete only when:

- [ ] Implementation follows the conventions above.
- [ ] Uses only design tokens (no hex).
- [ ] Exported from `src/index.ts`.
- [ ] Has a `.stories.tsx` covering key variants/states.
- [ ] Has unit tests for behaviour and variants.
- [ ] Passes accessibility checks (Storybook a11y addon).
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` are green.
- [ ] A Changeset is added (`pnpm changeset`) describing the change.
- [ ] Registry entry added/updated when applicable (Epic 5).

## Commits & versioning

- Follow [Conventional Commits](https://www.conventionalcommits.org/).
- Record user-facing changes with `pnpm changeset`.
