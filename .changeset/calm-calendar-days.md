---
"@gambitech/ds": minor
---

Add `Calendar` primitive (Epic 3).

- Wraps `react-day-picker` v10 with token-only styling (single and range
  selection, dropdown caption, outside days).
- Ships `CalendarDayButton` and `CalendarSkeleton` (ADR-0005).
- Depends on `react-day-picker` and `date-fns` (for upcoming DatePicker
  formatting / locales).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
