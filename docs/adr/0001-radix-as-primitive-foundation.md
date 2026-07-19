# ADR-0001: Radix UI as the primitive foundation

- Status: Accepted
- Date: 2026-07-19

## Context

The design system needs a headless behaviour/accessibility layer to build its
UI primitives on top of. The reference UI inventories disagree: the Clipper
inventory assumes classic shadcn/ui (Radix UI), while the CestoAgenda inventory
lists `@base-ui/react` (shadcn `base-nova` style). We must commit to a single
foundation because it dictates the implementation of every primitive.

## Problem

Which headless primitive foundation should the library standardise on?

## Alternatives

1. **Radix UI** — the classic shadcn/ui foundation. Mature, widely documented,
   large ecosystem, and the default target of the shadcn CLI/registry.
2. **Base UI (`@base-ui/react`)** — the successor line used by the `base-nova`
   style. Newer and promising, but less battle-tested, with a smaller ecosystem
   and more churn in its API surface.

## Decision

Adopt **Radix UI** as the primitive foundation.

Rationale: maturity, stability, documentation, and first-class alignment with
the shadcn custom registry distribution model (ADR-0003), which is our primary
distribution channel. This minimises risk and maximises compatibility for
consumers who already use shadcn.

## Consequences

- Primitives wrap Radix UI packages, styled with Tailwind v4 tokens and CVA.
- `components.json` uses a Radix-compatible shadcn style (`new-york`).
- If Base UI matures, a future ADR may revisit this; a migration would be a
  breaking change and must be versioned accordingly.
