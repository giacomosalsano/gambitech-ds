---
"@gambitech/ds": minor
---

Add `DropdownMenu` and `Popover` primitives (Epic 2).

- `DropdownMenu` — wraps `@radix-ui/react-dropdown-menu` with trigger, content,
  item (including `destructive` variant), checkbox/radio items, label,
  separator, shortcut, and submenu parts. Token-only (`bg-popover`, accent
  focus, etc.).
- `Popover` — wraps `@radix-ui/react-popover` with trigger, content, and
  anchor. Content defaults to `align="center"` and `sideOffset={4}`.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
