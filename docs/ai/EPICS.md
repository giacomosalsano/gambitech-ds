# Design System Epics & Tracking

> **AI INSTRUCTION:** Update this file whenever a task is completed. Change `[ ]` to `[x]`. Never mark a task as complete if tests and docs are missing. Stop and wait for user approval after completing any sub-task.

## Epic 1: Foundation & Tooling

- [x] Initialize project (React, TS, Tailwind v4).
- [x] Configure ESLint, Prettier, and basic linting rules.
- [x] Setup Vitest and React Testing Library.
- [x] Setup Storybook with Tailwind v4 support.
- [x] Define the base `globals.css` with default tokens (Clipper neutral theme).

> **Epic 1 complete (2026-07-19).** Additional foundational tooling wired per the
> role brief: TypeScript (strict), tsup build, Playwright (Storybook-based E2E),
> Changesets, a Next.js playground app, and a `components.json` + `registry.json`
> stub for the shadcn custom registry (Epic 5). Decisions recorded in
> `docs/adr/0001`–`0003`. **No UI components were built.** Awaiting approval
> before starting Epic 2.

## Epic 2: Core UI Primitives (Shadcn Baseline)

- [ ] Button & Badge (with variants).
- [ ] Inputs (Text, Number, Textarea, Checkbox, Radio, Switch).
- [ ] Dialog & Sheet (Modals and Drawers).
- [ ] DropdownMenu & Popover.
- [ ] Card & Separator.
- [ ] Alert & Toast (Sonner).

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
