---
"@gambitech/ds": minor
---

Add `DatePickerRange` primitive (Epic 3).

- Composes `Popover` + `Button` + `Calendar` (`mode="range"`) for date-range
  selection (defaults to two months).
- Optional `showTodayButton` navigates the visible month to today without
  selecting dates (`todayButtonLabel` overridable for i18n).
- Ships `DatePickerRangeSkeleton` (ADR-0005).

Exported from `@gambitech/ds`. No hardcoded colors; light/dark ready.
