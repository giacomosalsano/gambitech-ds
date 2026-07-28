---
"@gambitech/ds": minor
---

Add `Card` and `Separator` primitives (Epic 2).

- `Card` — compound layout surface (`Header`/`Title`/`Description`/`Action`/
  `Content`/`Footer`) using card tokens only. Ships a `CardSkeleton`
  (ADR-0005).
- `Separator` — wraps `@radix-ui/react-separator` with horizontal/vertical
  orientation and decorative mode. Token-only (`bg-border`).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
