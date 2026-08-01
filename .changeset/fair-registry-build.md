---
"@gambitech/ds": patch
---

Configure shadcn custom registry generation (Epic 5).

- Root `registry.json` composes nested catalogs via `include`
  (`src/lib`, `src/components/ui`, `src/components/composites`).
- Add `pnpm registry:validate` and `pnpm build:registry` (output `public/r/`).
- Wire validation + registry build into CI. Item mapping comes next.
