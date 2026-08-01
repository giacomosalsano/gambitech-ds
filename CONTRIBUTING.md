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
  passed via props/children. Stories and docs use English.

### File layout (folder per component)

Primitives:

```
src/components/ui/<name>/
  <name>.tsx           # implementation
  <name>.types.ts      # component props/types (shared types in src/lib/types.ts)
  <name>.stories.tsx   # Storybook stories (light + dark via addon-themes)
  <name>.test.tsx      # unit tests (Vitest + RTL)
  index.ts             # explicit exports for this component
```

Composites (Epic 4+) use the same colocated layout under
`src/components/composites/<name>/`.

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
Vitest runner that executes stories as tests is **deferred**: unit tests
(Vitest + RTL, jsdom) are the CI gate. Wiring it requires pinning the Vitest 4
Playwright provider and installing `chromium`. Until then, run stories
interactively via `pnpm dev`.

## Shadcn registry

Source registries are composed via `include` from the root `registry.json`:

- `src/lib/registry.json` — `utils`, `types`
- `src/styles/registry.json` — design tokens (`styles`)
- `src/components/ui/registry.json` — primitives
- `src/components/composites/registry.json` — composites

| Command                  | What it runs                                                    |
| ------------------------ | --------------------------------------------------------------- |
| `pnpm registry:sync`     | Regenerate nested catalogs from component folders (preferred).  |
| `pnpm registry:validate` | Sync + validate source registries (schema, paths, uniqueness).  |
| `pnpm build:registry`    | Sync + emit flattened item JSON under `public/r/` (gitignored). |

After adding a component folder, run `pnpm registry:sync` (or validate/build).
Same-repo `registryDependencies` use GitHub addresses
(`giacomosalsano/gambitech-ds/<name>`). Consumer install checks are Epic 5.3.

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
- [ ] `pnpm registry:validate` stays green after registry edits.

## Commits & versioning

- Follow [Conventional Commits](https://www.conventionalcommits.org/).
- Record user-facing changes with `pnpm changeset`.

## Language

All documentation, code comments, variable names, commit messages, PR
descriptions, Storybook copy, and `docs/ai/EPICS.md` updates must be written in
**English**. Consumer apps may localize UI strings; the design system itself
stays English in source and docs, while remaining i18n-ready (no hardcoded
user-facing copy inside components).
