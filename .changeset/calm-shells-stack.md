---
"@gambitech/ds": minor
---

Add `AppShell` composite (Epic 4).

- Compound layout (`Sidebar`/`Main`/`Header`/`Content`/`MobileTrigger`) with
  desktop sidebar tokens, sticky topnav, and mobile drawer via `Sheet`.
- Controlled/uncontrolled mobile open state; i18n-ready labels.
- Ships `AppShellSkeleton` (ADR-0005). Lives under
  `src/components/composites/`.

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
