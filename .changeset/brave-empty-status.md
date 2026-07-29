---
"@gambitech/ds": minor
---

Add `EmptyState` and `StatusBadge` composites (Epic 4).

- `EmptyState`: compound empty region (`Icon`/`Title`/`Description`/`Action`)
  with `role="status"`; copy via children for i18n.
- `StatusBadge`: `Badge` wrapper with consumer-owned `statuses` map
  (label + variant per key, ADR-0002). Both ship skeletons (ADR-0005).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
