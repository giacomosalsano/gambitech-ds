import type * as React from "react";
import type { Locale } from "date-fns";
import type { DateRange } from "react-day-picker";

import type { ButtonProps } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import type { PopoverContentProps } from "@/components/ui/popover";
import type { SkeletonProps } from "@/components/ui/skeleton";

export type { DateRange };

export interface DatePickerRangeProps
  extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  /**
   * Controlled selected range. Use `null` for a controlled empty value;
   * omit (or use `defaultValue`) for uncontrolled mode.
   */
  value?: DateRange | null;
  /**
   * Uncontrolled initial selected range.
   */
  defaultValue?: DateRange;
  /**
   * Called when the selected range changes.
   */
  onValueChange?: (range: DateRange | undefined) => void;
  /**
   * Placeholder shown when no range is selected. Defaults to
   * `"Pick a date range"`. Override for i18n.
   */
  placeholder?: string;
  /**
   * `date-fns` format string for each bound in the trigger. Defaults to
   * `"LLL dd, y"`.
   */
  formatString?: string;
  /**
   * Separator between the formatted start and end dates. Defaults to `" – "`.
   */
  rangeSeparator?: string;
  /**
   * Optional `date-fns` locale for formatting the trigger label.
   */
  locale?: Locale;
  /**
   * Disables the trigger and prevents opening the popover.
   */
  disabled?: boolean;
  /**
   * When `true`, shows a footer button that navigates the calendar to the
   * current month/day **without selecting** today's date. Defaults to `false`.
   */
  showTodayButton?: boolean;
  /**
   * Label for the today navigation button. Defaults to `"Today"`.
   * Override for i18n.
   */
  todayButtonLabel?: string;
  /**
   * Props forwarded to the trigger `Button` (except `disabled` / children).
   */
  triggerProps?: Omit<ButtonProps, "disabled" | "children">;
  /**
   * Props forwarded to `PopoverContent`.
   */
  contentProps?: Omit<PopoverContentProps, "children">;
  /**
   * Props forwarded to `Calendar` (selection wiring is owned by
   * DatePickerRange). Defaults include `numberOfMonths={2}`.
   */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "month" | "onMonthChange"
  >;
}

export type DatePickerRangeSkeletonProps = SkeletonProps;
