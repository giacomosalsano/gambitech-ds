import type * as React from "react";
import type { DayButton, DayPicker } from "react-day-picker";

import type { ButtonProps } from "@/components/ui/button";
import type { SkeletonProps } from "@/components/ui/skeleton";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /**
   * Variant applied to the previous/next month navigation buttons.
   * Defaults to `"ghost"`.
   */
  buttonVariant?: ButtonProps["variant"];
};

export type CalendarDayButtonProps = React.ComponentProps<typeof DayButton>;

export type CalendarSkeletonProps = SkeletonProps;
