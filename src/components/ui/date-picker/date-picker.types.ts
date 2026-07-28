import type * as React from "react";
import type { Locale } from "date-fns";

import type { ButtonProps } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import type { PopoverContentProps } from "@/components/ui/popover";
import type { SkeletonProps } from "@/components/ui/skeleton";

export interface DatePickerProps
  extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  /**
   * Controlled selected date. Use `null` for a controlled empty value;
   * omit (or use `defaultValue`) for uncontrolled mode.
   */
  value?: Date | null;
  /**
   * Uncontrolled initial selected date.
   */
  defaultValue?: Date;
  /**
   * Called when the selected date changes.
   */
  onValueChange?: (date: Date | undefined) => void;
  /**
   * Placeholder shown when no date is selected. Defaults to `"Pick a date"`.
   * Override for i18n.
   */
  placeholder?: string;
  /**
   * `date-fns` format string used for the trigger label. Defaults to
   * `"PPP"` (e.g. `July 15th, 2026`).
   */
  formatString?: string;
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
   * Props forwarded to `Calendar` (selection wiring is owned by DatePicker).
   */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "month" | "onMonthChange"
  >;
}

export type DatePickerSkeletonProps = SkeletonProps;
