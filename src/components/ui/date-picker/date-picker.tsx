import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  DatePickerProps,
  DatePickerSkeletonProps,
} from "./date-picker.types";

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatString = "PPP",
  locale,
  disabled = false,
  showTodayButton = false,
  todayButtonLabel = "Today",
  triggerProps,
  contentProps,
  calendarProps,
  className,
  ...props
}: DatePickerProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | undefined>(
    defaultValue,
  );
  const selected = isControlled
    ? (value ?? undefined)
    : uncontrolledValue;

  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<Date>(selected ?? new Date());

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && selected) {
      setMonth(selected);
    }
  };

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(date);
    }
    onValueChange?.(date);
    if (date) {
      setMonth(date);
      setIsOpen(false);
    }
  };

  const handleToday = () => {
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

  const { className: calendarClassName, ...restCalendarProps } =
    calendarProps ?? {};

  return (
    <div data-slot="date-picker" className={cn("w-fit", className)} {...props}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={triggerVariant}
            disabled={disabled}
            data-slot="date-picker-trigger"
            data-empty={!selected ? true : undefined}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              triggerClassName,
            )}
            {...restTriggerProps}
          >
            <CalendarIcon />
            {selected ? (
              format(selected, formatString, { locale })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-slot="date-picker-content"
          align={align}
          className={cn("w-auto p-0", contentClassName)}
          {...restContentProps}
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            className={calendarClassName}
            {...restCalendarProps}
          />
          {showTodayButton ? (
            <div data-slot="date-picker-today" className="border-t p-2">
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

function DatePickerSkeleton({ className, ...props }: DatePickerSkeletonProps) {
  return (
    <Skeleton
      data-slot="date-picker-skeleton"
      className={cn("h-9 w-[280px] rounded-md", className)}
      {...props}
    />
  );
}

export { DatePicker, DatePickerSkeleton };
export type {
  DatePickerProps,
  DatePickerSkeletonProps,
} from "./date-picker.types";
