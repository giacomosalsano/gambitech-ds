---
"@gambitech/ds": minor
---

Add the `Label` and `Input` form primitives (first slice of Epic 2 Inputs).

- `Label` — wraps `@radix-ui/react-label`; token-only, associates with a control
  via `htmlFor`/`id` (click-to-focus) and dims alongside disabled peers/groups.
- `Input` — token-only native input supporting any `type` (text, number, email,
  password, file, ...), with `aria-invalid` and `disabled` states. Ships a
  matching `InputSkeleton` (ADR-0005) mirroring the input's height/radius.

Both are exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
