---
"@gambitech/ds": patch
---

Validate shadcn consumer installs end-to-end (Epic 5).

- Add `pnpm registry:smoke` (local registry server + `shadcn add` assertions).
- Keep the smoke consumer outside the monorepo so `pnpm-lock.yaml` is untouched.
- Document npm and registry consumption in the README.
- Wire the smoke check into CI. Closes Epic 5.
