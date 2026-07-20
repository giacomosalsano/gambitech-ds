# ADR-0003: Dual distribution — shadcn registry and npm package

- Status: Accepted
- Date: 2026-07-19

## Context

Consumers have different integration preferences. Some want to own component
source (shadcn model), others want a versioned dependency they can upgrade.
The role brief mandates the shadcn custom registry pattern, while the UI
inventories also reference `import { Button } from "@org/ds"`.

## Problem

How should the library be distributed to satisfy both source-ownership and
versioned-dependency consumers without maintaining two divergent codebases?

## Alternatives

1. **Registry only** — closest to shadcn; no bundling. Excludes teams that want
   a plain npm dependency.
2. **npm package only** — simple to publish; loses the shadcn "own your code"
   workflow that the brief mandates.
3. **Dual distribution** — one source of truth in `src/`, exposed both as a
   generated shadcn registry and as a built npm package.

## Decision

Adopt **dual distribution** from a single `src/` source of truth:

- **Registry**: `registry.json` describes items installable via `npx shadcn add`.
- **npm package**: `@gambitech/ds`, built with tsdown (Rolldown) to `dist/`,
  versioned with Changesets and Semantic Versioning.

## Consequences

- Components must be authored so they work both as copied source and as an
  imported module (no absolute-path assumptions; rely on the `@/*` alias and
  the `cn` utility).
- Two publish steps in CI: build the npm package and generate/validate the
  registry (Epic 5).
- CSS tokens are shipped via the `./styles.css` export and referenced by the
  registry, keeping a single token source.
