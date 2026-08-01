const LOCALE = "en-US";
const ABBREVIATED_MONTH_LENGTH = 3;
const MONTHS_PER_YEAR = 12;

const monthFormatter = new Intl.DateTimeFormat(LOCALE, { month: "long" });
const weekdayFormatter = new Intl.DateTimeFormat(LOCALE, { weekday: "long" });
const ordinalRules = new Intl.PluralRules(LOCALE, { type: "ordinal" });

const ORDINAL_SUFFIXES: Record<string, string> = {
  one: "st",
  two: "nd",
  few: "rd",
};

const REGEXP_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function subDays(date: Date, amount: number): Date {
  return addDays(date, -amount);
}

export function addMonths(date: Date, amount: number): Date {
  const shifted = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  return withDayOfMonth(shifted, Math.min(date.getDate(), daysInMonth(shifted)));
}

export function subMonths(date: Date, amount: number): Date {
  return addMonths(date, -amount);
}

export function addYears(date: Date, amount: number): Date {
  return addMonths(date, amount * MONTHS_PER_YEAR);
}

export function subYears(date: Date, amount: number): Date {
  return addYears(date, -amount);
}

export function withDayOfMonth(date: Date, dayOfMonth: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), dayOfMonth);
}

/** `10th` */
export function formatOrdinal(value: number): string {
  const suffix = ORDINAL_SUFFIXES[ordinalRules.select(value)] ?? "th";
  return `${value}${suffix}`;
}

/** `Jul 10, 2026` — the `LLL dd, y` label rendered on the picker triggers. */
export function formatShortDate(date: Date): string {
  const month = monthFormatter.format(date).slice(0, ABBREVIATED_MONTH_LENGTH);
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}, ${date.getFullYear()}`;
}

/** `July 10th, 2026` — the `PPP` label rendered on the date picker trigger. */
export function formatMediumDate(date: Date): string {
  return `${monthFormatter.format(date)} ${formatOrdinal(date.getDate())}, ${date.getFullYear()}`;
}

/** `Friday, July 10th, 2026` — the ARIA label of a calendar day button. */
export function formatLongDate(date: Date): string {
  return `${weekdayFormatter.format(date)}, ${formatMediumDate(date)}`;
}

/** `July 2026` — the ARIA label of a calendar month grid. */
export function formatMonthYear(date: Date): string {
  return `${monthFormatter.format(date)} ${date.getFullYear()}`;
}

function escapeRegExp(value: string): string {
  return value.replace(REGEXP_SPECIAL_CHARACTERS, "\\$&");
}

function namePattern(fragments: string[]): RegExp {
  return new RegExp(fragments.map(escapeRegExp).join(".*"), "i");
}

export function shortDateNamePattern(...dates: Date[]): RegExp {
  return namePattern(dates.map(formatShortDate));
}

export function mediumDateNamePattern(...dates: Date[]): RegExp {
  return namePattern(dates.map(formatMediumDate));
}

export function longDateNamePattern(...dates: Date[]): RegExp {
  return namePattern(dates.map(formatLongDate));
}
