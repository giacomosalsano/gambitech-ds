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

> **Test date utilities added (2026-08-01).** Follow-up to the Vitest setup.
> `src/test/date.utils.ts` holds dependency-free date arithmetic (`startOfDay`,
> `add*`/`sub*` days/months/years, `withDayOfMonth`) and `en-US` formatters that
> reproduce the labels under test, built on native `Intl` so assertions stay an
> independent oracle of `date-fns`. `src/test/date.mocks.ts` holds anchors
> derived from the day the suite runs (`today`, `currentMonth`, `pastMonth` and
> the day constants built from them). The `DatePicker` and `DatePickerRange`
> suites were migrated off hardcoded calendar dates, which fixed a `DatePicker`
> test that had started failing once the clock moved past July 2026. `src/test/`
> is test-only: not published, not in the registry. Convention documented in
> `CONTRIBUTING.md`. CI now calls `pnpm test:run`, since `pnpm test` was
> repointed to watch mode.

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
- [x] Card & Separator.
- [x] Alert & Toast (Sonner).

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

> **Card & Separator complete (2026-07-28).** `Card` is a compound surface
> (`Header`/`Title`/`Description`/`Action`/`Content`/`Footer`) using card
> tokens only, plus a `CardSkeleton` (ADR-0005). `Separator` wraps
> `@radix-ui/react-separator` with horizontal/vertical orientation and
> decorative mode (`bg-border`). Re-exported from `src/index.ts`. 9 new tests
> (92 total); full gauntlet green. This closes **Card & Separator** — next up:
> **Alert & Toast (Sonner)**.

> **Alert & Toast (Sonner) complete — Epic 2 done (2026-07-28).** `Alert` is an
> inline `role="alert"` banner (`Title`/`Description`) with status variants
> (`default`/`destructive`/`success`/`warning`/`info`) plus `AlertSkeleton`
> (ADR-0005). Distinct from `AlertDialog` (modal confirm). `Toaster` + `toast`
> wrap Sonner with popover tokens; theme is a prop (no `next-themes` coupling).
> Re-exported from `src/index.ts`. 14 new tests (106 total); full gauntlet
> green. This closes **Epic 2** — next up: **Epic 3 (Table & Pagination)**.

## Epic 3: Complex Primitives

- [x] Table & Pagination.
- [x] Calendar (react-day-picker + date-fns).
- [x] DatePicker (single).
- [x] DatePickerRange.
- [x] Command (Combobox).
- [x] Tabs & Breadcrumb.

> **Table & Pagination complete (2026-07-28).** `Table` is a compound HTML
> table (`Header`/`Body`/`Footer`/`Row`/`Head`/`Cell`/`Caption`) with an
> overflow container, selected-row tokens, and sortable headers (`isSortable`
> / `sortDirection` / `onSort`, plus `getNextTableSortDirection` helper).
> Row reordering stays with the consumer (numeric or alphabetical
> comparators). Ships a `TableSkeleton` (ADR-0005). `Pagination` is a
> navigation compound (`Content`/`Item`/`Link`/`Previous`/`Next`/`Ellipsis`)
> built on `buttonVariants`, with overridable labels/children for i18n.
> Re-exported from `src/index.ts`. 120 tests total; full gauntlet green. Next
> up: **Calendar & Command**.

> **Calendar complete (2026-07-28).** Wraps `react-day-picker` v10 with
> token-only styling (single/range modes, dropdown caption, outside days).
> Ships `CalendarDayButton` and `CalendarSkeleton` (ADR-0005). Adds
> `react-day-picker` + `date-fns` dependencies. Re-exported from
> `src/index.ts`. 6 new tests (126 total); full gauntlet green. Next up:
> **DatePicker (single)**, then **DatePickerRange**, then **Command**.

> **DatePicker complete (2026-07-28).** Composes `Popover` + `Button` +
> `Calendar` for single-date selection. Optional `showTodayButton` navigates
> the visible month to today **without selecting** the date
> (`todayButtonLabel` overridable for i18n). Ships `DatePickerSkeleton`
> (ADR-0005). Re-exported from `src/index.ts`. 7 new tests (133 total); full
> gauntlet green. Next up: **DatePickerRange**.

> **DatePickerRange complete (2026-07-28).** Composes `Popover` + `Button` +
> `Calendar` (`mode="range"`, default two months). Same `showTodayButton`
> behavior as DatePicker (navigate only, no selection). Closes after the
> second selection gesture (react-day-picker sets `from===to` on first click).
> Ships `DatePickerRangeSkeleton` (ADR-0005). Re-exported from `src/index.ts`.
> 7 new tests (140 total); full gauntlet green. Next up: **Command**.

> **Command complete (2026-07-28).** Wraps `cmdk` with token-only styling
> (`Input`/`List`/`Empty`/`Group`/`Item`/`Separator`/`Shortcut`). Ships
> `CommandDialog` (palette over `Dialog`) and `CommandSkeleton` (ADR-0005).
> Combobox pattern is composition (`Popover` + `Command`), shown in Storybook.
> Adds `cmdk` dependency. Re-exported from `src/index.ts`. 6 new tests (146
> total); full gauntlet green. Next up: **Tabs & Breadcrumb**.

> **Tabs & Breadcrumb complete — Epic 3 done (2026-07-28).** `Tabs` wraps
> `@radix-ui/react-tabs` with horizontal/vertical orientation, list variants
> (`default`/`line`), and `TabsSkeleton` (ADR-0005). `Breadcrumb` is a compound
> nav trail (`List`/`Item`/`Link`/`Page`/`Separator`/`Ellipsis`) with `asChild`
> on links, overridable `aria-label`/separator for i18n, and
> `BreadcrumbSkeleton` (ADR-0005). Adds `@radix-ui/react-tabs`. Re-exported
> from `src/index.ts`. 10 new tests (156 total); full gauntlet green. This
> closes **Epic 3** — next up: **Epic 4 (AppShell)**.

## Epic 4: Clipper Domain Composites (Agnostic)

- [x] AppShell (Sidebar/Topnav layout).
- [x] MetricCard (Label, value, empty state).
- [x] ContextSwitcher (Multi-membership toggle UI).
- [x] EmptyState & StatusBadge.
- [x] DataList / EntityRow.

> **AppShell complete (2026-07-29).** First Epic 4 composite under
> `src/components/composites/app-shell/`. Compound layout (`Sidebar` / `Main` /
> `Header` / `Content` / `MobileTrigger`) with desktop sidebar (sidebar tokens),
> sticky topnav, and mobile drawer via `Sheet`. Controlled/uncontrolled mobile
> open state; overridable `mobileNavTitle` and trigger `aria-label` for i18n.
> Ships `AppShellSkeleton` (ADR-0005). Re-exported from `src/index.ts`. 7 new
> tests (163 total); full gauntlet green. Next up: **MetricCard**.

> **MetricCard complete (2026-07-29).** Compound metric surface (`Label` /
> `Value` / `Empty`) using card tokens; empty copy stays in children for i18n
> (e.g. “No ratings” / “Sem avaliações”). Ships `MetricCardSkeleton`
> (ADR-0005). Re-exported from `src/index.ts`. 5 new tests (168 total); full
> gauntlet green. Next up: **ContextSwitcher**.

> **ContextSwitcher complete (2026-07-29).** Multi-membership toggle built on
> `DropdownMenu` + radio items. Compound API (`Trigger` / `TriggerLabel` /
> `TriggerValue` / `Content` / `Label` / `Items` / `Item` / `Separator`) with
> controlled/uncontrolled `value`/`onValueChange`; labels via children for
> i18n (ADR-0002). Ships `ContextSwitcherSkeleton` (ADR-0005). Re-exported
> from `src/index.ts`. 7 new tests (175 total); full gauntlet green. Next up:
> **EmptyState & StatusBadge**.

> **EmptyState & StatusBadge complete (2026-07-29).** `EmptyState` is a
> compound empty region (`Icon` / `Title` / `Description` / `Action`) with
> `role="status"` and i18n via children. `StatusBadge` wraps `Badge` with a
> consumer-owned `statuses` map (label + variant per key, ADR-0002); unknown
> keys fall back to `outline` + raw status. Both ship skeletons (ADR-0005).
> Re-exported from `src/index.ts`. 8 new tests (183 total); full gauntlet
> green. Next up: **DataList / EntityRow**.

> **DataList / EntityRow complete — Epic 4 done (2026-07-29).** `DataList` is
> a bordered, divided list surface; `EntityRow` compounds `Content` / `Title` /
> `Meta` / `Value` / `Actions` (name + meta + price + actions). Copy via
> children for i18n; ships `DataListSkeleton` and `EntityRowSkeleton`
> (ADR-0005). Re-exported from `src/index.ts`. 4 new tests (187 total); full
> gauntlet green. This closes **Epic 4** — next up: **Epic 5 (registry.json)**.

## Epic 5: Shadcn Custom Registry Setup

- [x] Configure `registry.json` generation.
- [x] Map all components to standard registry format.
- [x] Validate consumer installation via `npx shadcn add`.

> **Registry generation complete (2026-08-01).** Root `registry.json` composes
> nested catalogs via `include` (`src/lib`, `src/styles`, `src/components/ui`,
> `src/components/composites`). Added `shadcn` as a devDependency plus
> `pnpm registry:validate` and `pnpm build:registry` (flattened output under
> `public/r/`, gitignored). CI runs validate + registry build.

> **Component mapping complete (2026-08-01).** `scripts/sync-registry.mjs`
> scans `src/` and writes nested catalogs: lib (`utils`, `types`), styles
> (`styles`), 26 UI primitives, and 6 composites (**35 items**). Files use
> `@ui` / `@lib` / `@components` targets; same-repo deps use GitHub addresses
> (`giacomosalsano/gambitech-ds/<name>`). `pnpm registry:validate` and
> `pnpm build:registry` green.

> **Consumer install validation complete — Epic 5 done (2026-08-04).**
> `pnpm registry:smoke` builds the registry, serves it locally, runs
> `shadcn add @gambitech/button @gambitech/app-shell` into a temp consumer,
> and asserts files + transitive deps (`utils`, `types`, `skeleton`, `sheet`).
> Documented npm + registry install paths in `README.md`. Smoke also runs in CI.
> This closes **Epic 5**.
