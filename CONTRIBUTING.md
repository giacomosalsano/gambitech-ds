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

| Command         | What it runs                                    |
| --------------- | ----------------------------------------------- |
| `pnpm test`     | Unit tests (Vitest + RTL, jsdom) in watch mode. |
| `pnpm test:run` | Same suite, single run. This is the CI gate.    |
| `pnpm test:ui`  | Same suite in watch mode with the Vitest UI.    |
| `pnpm test:e2e` | Playwright E2E against the built Storybook.     |

`test:e2e` needs a browser once:

```bash
pnpm exec playwright install chromium
```

### Dates in tests

Never hardcode a calendar date in a test. Fixed dates silently rot: an assertion
written against `Jul 10, 2026` keeps passing until the day the clock moves past
the month the component happens to render, and then fails for reasons unrelated
to the change under review.

Derive dates from the shared helpers instead:

- `src/test/date.mocks.ts` — anchors derived from the day the suite runs
  (`today`, `currentMonth`, `pastMonth`) and the day constants built from them
  (`startDay`, `middleDay`, `endDay`, their `past*` counterparts, plus the
  `selectedDay` / `pastDay` aliases). Day numbers stay within 1–28 so they exist
  in every month.
- `src/test/date.utils.ts` — dependency-free date arithmetic (`startOfDay`,
  `addDays` / `subDays`, `addMonths` / `subMonths`, `addYears` / `subYears`,
  `withDayOfMonth`) and `en-US` formatters that reproduce the labels under test:
  `formatShortDate` (`LLL dd, y` trigger), `formatMediumDate` (`PPP` trigger),
  `formatLongDate` (day button ARIA label) and `formatMonthYear` (month grid
  ARIA label), plus the matching `*NamePattern` accessible-name matchers.

The formatters are built on native `Intl` rather than `date-fns` on purpose, so
assertions stay an independent oracle of the library the components format with.

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
| `pnpm registry:smoke`    | Local `shadcn add` consumer install smoke (also runs in CI).    |

After adding a component folder, run `pnpm registry:sync` (or validate/build).
Same-repo `registryDependencies` use GitHub addresses
(`giacomosalsano/gambitech-ds/<name>`).

Consumer install smoke (builds registry, serves it locally, runs `shadcn add`):

```bash
pnpm registry:smoke
```

## Definition of Done (per component)

A component is complete only when:

- [ ] Implementation follows the conventions above.
- [ ] Uses only design tokens (no hex).
- [ ] Exported from `src/index.ts`.
- [ ] Has a `.stories.tsx` covering key variants/states.
- [ ] Has unit tests for behaviour and variants.
- [ ] Passes accessibility checks (Storybook a11y addon).
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:run`, `pnpm build` are green.
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
