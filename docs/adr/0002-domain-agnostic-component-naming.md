# ADR-0002: Domain-agnostic component naming

- Status: Accepted
- Date: 2026-07-19

## Context

The library serves multiple consumer products (e.g. CestoAgenda, Clipper) with
different domain vocabularies. The Clipper inventory explicitly requires neutral
naming (`Establishment`, `Collaborator`, `Service`, `Appointment`) and forbids
product-specific terms such as `barber`/`barbershop`.

## Problem

How should components — especially domain composites — be named so they remain
reusable across unrelated consumer domains?

## Alternatives

1. **Product-specific names** (e.g. `LaundryCard`, `BarberAgenda`). Fast to write
   but couples the shared library to one product's vocabulary.
2. **Domain-agnostic, generic names** (e.g. `EntityRow`, `StatusBadge`,
   `AppShell`, `PeriodFilter`). Slightly more abstract, but reusable everywhere.

## Decision

All exported components use **domain-agnostic, generic names**. Domain meaning
is supplied by consumers through props, configuration, and status maps — never
baked into component names or public APIs.

## Consequences

- Public APIs stay stable across consumers and rebrands.
- Status/label mappings (e.g. appointment or subscription states) are passed in
  by consumers rather than hardcoded in components.
- Reviews must reject product-specific terminology in exported symbols.
