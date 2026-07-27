---
"@gambitech/ds": minor
---

Add `Dialog` and `AlertDialog` primitives (first slice of Epic 2 Dialog & Sheet).

- `Dialog` — wraps `@radix-ui/react-dialog` with overlay, header/footer/title/
  description, and a top-right close (X) by default. Content accepts
  `showCloseButton` (default `true`) and `isOutsideDismissible` (default
  `true`; set to `false` to lock overlay clicks).
- `AlertDialog` — wraps `@radix-ui/react-alert-dialog` for confirmations.
  Centered title/description/footer actions, no X by default, and
  `isOutsideDismissible` default `false` (Radix already blocks outside dismiss;
  opting in wires overlay-click via a hidden Cancel). Shares the same content
  props for API parity. Includes `AlertDialogAction` / `AlertDialogCancel`
  styled with `buttonVariants`.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
