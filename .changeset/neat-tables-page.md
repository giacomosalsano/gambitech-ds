---
"@gambitech/ds": minor
---

Add `Table` and `Pagination` primitives (Epic 3).

- `Table` — compound HTML table (`Header`/`Body`/`Footer`/`Row`/`Head`/`Cell`/
  `Caption`) with overflow container, selected-row tokens, and sortable
  headers (`isSortable` / `sortDirection` / `onSort` +
  `getNextTableSortDirection`). Ships a `TableSkeleton` (ADR-0005).
- `Pagination` — navigation compound (`Content`/`Item`/`Link`/`Previous`/
  `Next`/`Ellipsis`) built on `buttonVariants`, with overridable labels for
  i18n.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
