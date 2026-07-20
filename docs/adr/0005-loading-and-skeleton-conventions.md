# ADR-0005: Loading and skeleton conventions for primitives

- Status: Accepted
- Date: 2026-07-20

## Context

Consumer apps (Clipper, CestoAgenda) render two distinct asynchronous UI
states: an **in-place loading** state on interactive controls (e.g. a submit
button while a Server Action runs) and a **placeholder/skeleton** state while a
region's data is still being fetched. The inventories list a missing `Skeleton`
primitive and rely on ad-hoc, per-app loading indicators today.

To keep these states consistent and reusable across every primitive, the
library needs a single, documented convention instead of each component
inventing its own approach.

## Problem

How should primitives expose loading and skeleton states so behaviour and
footprint stay consistent, accessible, and reusable across consumers?

## Alternatives

1. **Per-component, ad-hoc states.** Fast, but inconsistent APIs and duplicated
   spinner/placeholder markup across the library and consumers.
2. **A single generic `Skeleton` + a component-level `loading` prop, with each
   primitive composing its own `<Name>Skeleton` from the shared base.**
   Consistent API, reuses each component's own size definitions.

## Decision

Adopt a two-part convention:

1. **Loading state (`loading` prop).** Interactive primitives (starting with
   `Button`) accept a `loading` boolean. While loading, the component stays
   visually active (not greyed out like `disabled`), sets `aria-busy` and a
   `data-loading` attribute, shows a spinner where applicable, and suppresses
   click interaction to prevent duplicate submissions. `disabled` remains the
   separate, inert/greyed-out state.

2. **Skeleton state (base `Skeleton` + per-component `<Name>Skeleton`).** A base
   `Skeleton` primitive provides the animated placeholder (tokens only:
   `bg-muted` + `animate-pulse`). Each primitive that benefits from a loading
   placeholder exports a `<Name>Skeleton` composed from `Skeleton`, reusing the
   component's own size definitions so the placeholder occupies the same
   footprint as the loaded component. Per-component skeletons are rolled out
   incrementally, as convenient, rather than all at once.

## Consequences

- New primitives follow a predictable API: `loading` where interactive, and a
  colocated `<Name>Skeleton` where a placeholder is useful.
- The base `Skeleton` primitive is introduced ahead of its explicit slot in
  `EPICS.md` because the skeleton convention depends on it; it is a small,
  justified foundational addition.
- Content-dependent dimensions (e.g. button width) are approximated with
  sensible defaults in skeletons and can be overridden via `className`; heights
  and radii mirror the component's size variants exactly.
- Diverging from this convention for a specific primitive requires justification
  in review.
