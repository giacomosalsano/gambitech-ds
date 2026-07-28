---
"@gambitech/ds": minor
---

Add `Alert` and `Toaster` (Sonner) primitives (Epic 2).

- `Alert` — inline `role="alert"` banner with `Title`/`Description`, status
  variants (`default`/`destructive`/`success`/`warning`/`info`), and an
  `AlertSkeleton` (ADR-0005). Token-only.
- `Toaster` + `toast` — Sonner host styled with popover tokens. Theme is passed
  via props (no `next-themes` coupling).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
