---
"@gambitech/ds": minor
---

Add `Tabs` and `Breadcrumb` primitives (Epic 3).

- `Tabs` wraps `@radix-ui/react-tabs` with horizontal/vertical orientation,
  list variants (`default`/`line`), and `TabsSkeleton` (ADR-0005).
- `Breadcrumb` is a compound nav trail (`List`/`Item`/`Link`/`Page`/
  `Separator`/`Ellipsis`) with `asChild` on links and `BreadcrumbSkeleton`
  (ADR-0005). Closes Epic 3.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
