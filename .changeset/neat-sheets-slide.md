---
"@gambitech/ds": minor
---

Add the `Sheet` drawer primitive, completing Epic 2 Dialog & Sheet.

- `Sheet` — built on `@radix-ui/react-dialog` with CVA `side` variants
  (`top`, `right`, `bottom`, `left`; default `right`). Content accepts
  `showCloseButton` (default `true`) and `isOutsideDismissible` (default
  `true`) for API parity with `Dialog`. Exposes `sheetContentVariants`.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
