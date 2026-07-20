---
"@gambitech/ds": minor
---

Add the first core UI primitives: `Button`, `Badge`, and a base `Skeleton`.

- `Button` — Radix `Slot` (`asChild`), CVA variants (`default`, `secondary`,
  `destructive`, `outline`, `ghost`, `link`) and sizes (`default`, `sm`, `lg`,
  `icon`), plus a `loading` state (keeps the control active, announces
  `aria-busy`, shows a spinner, and suppresses clicks to avoid duplicate
  submissions). Ships a matching `ButtonSkeleton`.
- `Badge` — CVA variants including status tokens (`success`, `warning`, `info`)
  in addition to the canonical set, with `asChild` support.
- `Skeleton` — token-only loading placeholder used as the base for
  per-component skeletons.

All components are token-only (no hardcoded colors) and support light/dark.
