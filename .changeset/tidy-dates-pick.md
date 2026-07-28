---
"@gambitech/ds": minor
---

Add `DatePicker` primitive (Epic 3).

- Composes `Popover` + `Button` + `Calendar` for single-date selection.
- Optional `showTodayButton` navigates the visible month to today without
  selecting the date (`todayButtonLabel` overridable for i18n).
- Ships `DatePickerSkeleton` (ADR-0005).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
