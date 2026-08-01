---
"@gambitech/ds": patch
---

Map all library items into the shadcn custom registry (Epic 5).

- Sync script derives files, npm deps, and same-repo registry deps from `src/`.
- Catalogs: `utils`/`types`, `styles`, 26 UI primitives, 6 composites (35 items).
- Targets use `@ui` / `@lib` / `@components` placeholders for consumer aliases.
