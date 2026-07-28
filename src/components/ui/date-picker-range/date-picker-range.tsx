import { useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  DatePickerRangeProps,
  DatePickerRangeSkeletonProps,
} from "./date-picker-range.types";

function formatRangeLabel(
  range: DateRange | undefined,
  formatString: string,
  rangeSeparator: string,
  locale: DatePickerRangeProps["locale"],
) {
  if (!range?.from) {
    return null;
  }

  if (!range.to) {
    return format(range.from, formatString, { locale });
  }

  return `${format(range.from, formatString, { locale })}${rangeSeparator}${format(range.to, formatString, { locale })}`;
}

function DatePickerRange({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  formatString = "LLL dd, y",
  rangeSeparator = " – ",
  locale,
  disabled = false,
  showTodayButton = false,
  todayButtonLabel = "Today",
  triggerProps,
  contentProps,
  calendarProps,
  className,
  ...props
}: DatePickerRangeProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<
    DateRange | undefined
  >(defaultValue);
  const selected = isControlled ? (value ?? undefined) : uncontrolledValue;

  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<Date>(
    selected?.from ?? selected?.to ?? new Date(),
  );
  const selectionCountRef = useRef(0);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      selectionCountRef.current = 0;
      const anchor = selected?.from ?? selected?.to;
      if (anchor) {
        setMonth(anchor);
      }
    }
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(range);
    }
    onValueChange?.(range);

    if (range?.from) {
      setMonth(range.from);
      selectionCountRef.current += 1;
    } else {
      selectionCountRef.current = 0;
    }

    if (range?.from && range.to && selectionCountRef.current >= 2) {
      setIsOpen(false);
      selectionCountRef.current = 0;
    }
  };

  const handleToday = () => {
    // Navigate the visible month to today without changing the selection.
    setMonth(new Date());
  };

  const {
    className: triggerClassName,
    variant: triggerVariant = "outline",
    ...restTriggerProps
  } = triggerProps ?? {};

  const {
    className: contentClassName,
    align = "start",
    ...restContentProps
  } = contentProps ?? {};

  const {
    className: calendarClassName,
    numberOfMonths = 2,
    ...restCalendarProps
  } = calendarProps ?? {};

  const label = formatRangeLabel(
    selected,
    formatString,
    rangeSeparator,
    locale,
  );

  return (
    <div
      data-slot="date-picker-range"
      className={cn("w-fit", className)}
      {...props}
    >
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={triggerVariant}
            disabled={disabled}
            data-slot="date-picker-range-trigger"
            data-empty={!selected?.from ? true : undefined}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !selected?.from && "text-muted-foreground",
              triggerClassName,
            )}
            {...restTriggerProps}
          >
            <CalendarIcon />
            {label ? <span>{label}</span> : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-slot="date-picker-range-content"
          align={align}
          className={cn("w-auto p-0", contentClassName)}
          {...restContentProps}
        >
          <Calendar
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={numberOfMonths}
            className={calendarClassName}
            {...restCalendarProps}
          />
          {showTodayButton ? (
            <div data-slot="date-picker-range-today" className="border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleToday}
              >
                {todayButtonLabel}
              </Button>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}

function DatePickerRangeSkeleton({
  className,
  ...props
}: DatePickerRangeSkeletonProps) {
  return (
    <Skeleton
      data-slot="date-picker-range-skeleton"
      className={cn("h-9 w-[300px] rounded-md", className)}
      {...props}
    />
  );
}

export { DatePickerRange, DatePickerRangeSkeleton };
export type {
  DatePickerRangeProps,
  DatePickerRangeSkeletonProps,
  DateRange,
} from "./date-picker-range.types";
