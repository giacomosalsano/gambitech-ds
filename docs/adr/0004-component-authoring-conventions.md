# ADR-0004: Component authoring conventions

- Status: Accepted
- Date: 2026-07-19

## Context

Before implementing Epic 2 (core primitives) we need consistent conventions for
how components are authored, organised and tested, so the library stays
maintainable and every contribution is reviewable in isolation.

## Problem

How should primitives be written on top of the Radix foundation (ADR-0001), and
how should their files be organised and tested?

## Decision

1. **Source basis:** adapt the canonical shadcn "new-york" component source
   (MIT) to our design tokens and domain-agnostic naming, rather than writing
   each primitive from scratch. This keeps behaviour/accessibility battle-tested
   and eases shadcn-registry compatibility.
2. **File layout:** one folder per component under `src/components/ui/<name>/`
   with colocated implementation, stories, tests and an `index.ts`. Components
   are re-exported from `src/index.ts` with explicit named exports.
3. **Styling:** Tailwind v4 semantic tokens + CVA for variants; `cn` for class
   composition; `tw-animate-css` for animation utilities. No hardcoded hex.
4. **Testing:** unit tests (Vitest + RTL, jsdom) run in CI via `pnpm test`;
   Playwright E2E runs against the built Storybook via `pnpm test:e2e`.
   Story/interaction testing tooling (`@storybook/addon-themes` +
   `@storybook/addon-vitest`) is installed and available in the Storybook UI;
   the browser-mode Vitest runner that executes stories as tests is wired with
   the first primitive in Epic 2 (pinning the Vitest 4 Playwright provider).
   Browser-based suites stay opt-in to keep CI fast and dependency-light.
5. **Theme review:** Storybook exposes a light/dark toggle via
   `@storybook/addon-themes` (class-based, matching the `.dark` token scope).

## Consequences

- Reviewers can evaluate a component in one folder (impl + stories + tests).
- CI stays fast (jsdom unit tests); browser suites are run locally or in a
  dedicated job once components exist.
- Diverging from these conventions requires a new ADR.
