# Design System Epics & Tracking

> **AI INSTRUCTION:** Update this file whenever a task is completed. Change `[ ]` to `[x]`. Never mark a task as complete if tests and docs are missing. Stop and wait for user approval after completing any sub-task.

## Epic 1: Foundation & Tooling

- [x] Initialize project (React, TS, Tailwind v4).
- [x] Configure ESLint, Prettier, and basic linting rules.
- [x] Setup Vitest and React Testing Library.
- [x] Setup Storybook with Tailwind v4 support.
- [x] Define the base `globals.css` with default tokens (Clipper neutral theme).

> **Epic 1 complete (2026-07-19).** Additional foundational tooling wired per the
> role brief: TypeScript (strict), tsdown build, Playwright (Storybook-based E2E),
> Changesets, a Next.js playground app, and a `components.json` + `registry.json`
> stub for the shadcn custom registry (Epic 5). Decisions recorded in
> `docs/adr/0001`–`0003`. **No UI components were built.** Awaiting approval
> before starting Epic 2.

## Epic 2: Core UI Primitives (Shadcn Baseline)

- [x] Button & Badge (with variants).
- [x] Inputs (Text, Number, Textarea, Checkbox, Radio, Switch).
  - [x] Label & Input (text/number/etc.) + `InputSkeleton`.
  - [x] Textarea + `TextareaSkeleton`.
  - [x] Checkbox + `CheckboxSkeleton`.
  - [x] RadioGroup (+ `RadioGroupItem`, `RadioGroupItemSkeleton`).
  - [x] Switch + `SwitchSkeleton`.
- [x] Dialog & Sheet (Modals and Drawers).
  - [x] Dialog + AlertDialog (`showCloseButton`, `isOutsideDismissible`).
  - [x] Sheet (`side`, `showCloseButton`, `isOutsideDismissible`).
- [x] DropdownMenu & Popover.
- [ ] Card & Separator.
- [ ] Alert & Toast (Sonner).

> **Button & Badge complete (2026-07-20).** Also introduced a base `Skeleton`
> primitive and a library-wide loading/skeleton convention (`isLoading` prop +
> per-component `<Name>Skeleton`), recorded in `docs/adr/0005`. `Button` ships an
> `isLoading` state and `ButtonSkeleton`; `Badge` adds `success`/`warning`/`info`
> status variants on top of the canonical set plus a `BadgeSkeleton`. Types are
> split into per-component `*.types.ts` files with shared types in
> `src/lib/types.ts`. Per-component skeletons for the remaining primitives are
> rolled out incrementally. The Storybook browser test runner
> (`@storybook/addon-vitest`) remains deferred; unit tests (Vitest + RTL) are the
> CI gate.

> **Label & Input complete (2026-07-27).** First slice of the Inputs task,
> started with the pair because of their accessibility coupling (`htmlFor`/`id`,
> click-to-focus). `Label` wraps `@radix-ui/react-label`; `Input` is a
> token-only native input with `aria-invalid` and `disabled` states plus an
> `InputSkeleton` (ADR-0005). Both are re-exported from `src/index.ts`. 10 new
> tests (35 total); full gauntlet green. Textarea, Checkbox, RadioGroup and
> Switch remain in this task.

> **Textarea complete (2026-07-27).** Token-only native `<textarea>` sharing the
> `Input` visual language (border/focus/`aria-invalid`/`disabled`) plus
> `field-sizing-content` for auto-grow and a matching `TextareaSkeleton`
> (ADR-0005). Re-exported from `src/index.ts`. 6 new tests (41 total); full
> gauntlet green. Checkbox, RadioGroup and Switch remain in this task.

> **Checkbox complete (2026-07-27).** Wraps `@radix-ui/react-checkbox`;
> token-only with `checked`/`indeterminate`/`disabled` and `aria-invalid`
> states. Indicator swaps a `Check` icon for a `Minus` icon in the indeterminate
> state (lucide-react). Ships a `CheckboxSkeleton` (ADR-0005). Re-exported from
> `src/index.ts`. 6 new tests (47 total); full gauntlet green. RadioGroup and
> Switch remain in this task.

> **RadioGroup complete (2026-07-27).** Wraps `@radix-ui/react-radio-group` as a
> `RadioGroup` + `RadioGroupItem` pair; token-only with single-selection,
> `disabled` and `aria-invalid` states and a filled `Circle` indicator. Ships a
> `RadioGroupItemSkeleton` (ADR-0005). Re-exported from `src/index.ts`. 5 new
> tests (52 total); full gauntlet green. Switch remains in this task. Later
> extended with an `orientation` prop (vertical default / horizontal layout,
> also driving `aria-orientation` and keyboard navigation), +2 tests.

> **Switch complete — Inputs task done (2026-07-27).** Wraps
> `@radix-ui/react-switch`; token-only with `checked`/`disabled` and
> `aria-invalid` states and a sliding thumb. Ships a `SwitchSkeleton` (ADR-0005).
> Re-exported from `src/index.ts`. 6 new tests (60 total); full gauntlet green.
> This closes the **Inputs** sub-task of Epic 2 — next up: **Dialog & Sheet**.

> **Dialog & AlertDialog complete (2026-07-27).** First slice of Dialog & Sheet.
> `Dialog` wraps `@radix-ui/react-dialog` (close button on by default, outside
> dismiss on by default). `AlertDialog` wraps `@radix-ui/react-alert-dialog`
> with centered title, description and footer actions, no X by default, and
> outside dismiss off by default. Shared content props: `showCloseButton` and
> `isOutsideDismissible` (boolean `is*` convention). 10 new tests (70 total);
> full gauntlet green. Sheet remains in this task.

> **Sheet complete — Dialog & Sheet task done (2026-07-27).** Drawer built on
> `@radix-ui/react-dialog` with CVA `side` variants (`top`/`right`/`bottom`/
> `left`, default `right`). Shares Dialog dismiss API (`showCloseButton`
> default `true`, `isOutsideDismissible` default `true`). Exposes
> `sheetContentVariants`. Re-exported from `src/index.ts`. 6 new tests (76
> total); full gauntlet green. This closes **Dialog & Sheet** — next up:
> **DropdownMenu & Popover**.

> **DropdownMenu & Popover complete (2026-07-27).** `DropdownMenu` wraps
> `@radix-ui/react-dropdown-menu` with item/checkbox/radio/label/separator/
> shortcut/submenu parts and a `destructive` item variant. `Popover` wraps
> `@radix-ui/react-popover` with trigger/content/anchor. Both use popover
> tokens only. Re-exported from `src/index.ts`. 7 new tests (83 total); full
> gauntlet green. Next up: **Card & Separator**.

## Epic 3: Complex Primitives

- [ ] Table & Pagination.
- [ ] Calendar (date-fns) & Command (Combobox).
- [ ] Tabs & Breadcrumb.

## Epic 4: Clipper Domain Composites (Agnostic)

- [ ] AppShell (Sidebar/Topnav layout).
- [ ] MetricCard (Label, value, empty state).
- [ ] ContextSwitcher (Multi-membership toggle UI).
- [ ] EmptyState & StatusBadge.
- [ ] DataList / EntityRow.

## Epic 5: Shadcn Custom Registry Setup

- [ ] Configure `registry.json` generation.
- [ ] Map all components to standard registry format.
- [ ] Validate consumer installation via `npx shadcn add`.
