import {
  startOfDay,
  startOfMonth,
  subMonths,
  withDayOfMonth,
} from "./date.utils";

export const today = startOfDay(new Date());

export const currentMonth = startOfMonth(today);

const PAST_MONTH_OFFSET = 18;

export const pastMonth = subMonths(currentMonth, PAST_MONTH_OFFSET);

export const SAFE_DAY_OF_MONTH = {
  start: 10,
  middle: 15,
  end: 18,
} as const;

function daysOf(monthStart: Date) {
  return {
    start: withDayOfMonth(monthStart, SAFE_DAY_OF_MONTH.start),
    middle: withDayOfMonth(monthStart, SAFE_DAY_OF_MONTH.middle),
    end: withDayOfMonth(monthStart, SAFE_DAY_OF_MONTH.end),
  } as const;
}

export const currentMonthDay = daysOf(currentMonth);

export const pastMonthDay = daysOf(pastMonth);

export const startDay = currentMonthDay.start;
export const middleDay = currentMonthDay.middle;
export const endDay = currentMonthDay.end;

export const pastStartDay = pastMonthDay.start;
export const pastMiddleDay = pastMonthDay.middle;
export const pastEndDay = pastMonthDay.end;

export const selectedDay = middleDay;
export const pastDay = pastStartDay;
