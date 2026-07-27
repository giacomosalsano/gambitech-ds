---
"@gambitech/ds": minor
---

Add the `RadioGroup` form primitive (Epic 2 Inputs).

- `RadioGroup` + `RadioGroupItem` — wrap `@radix-ui/react-radio-group`;
  token-only with single-selection, `disabled` and `aria-invalid` states and a
  filled `Circle` indicator. Supports vertical (default) and horizontal layouts
  via the `orientation` prop (which also drives `aria-orientation`/keyboard
  navigation). Ships a matching `RadioGroupItemSkeleton` (ADR-0005).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
