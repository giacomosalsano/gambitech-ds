import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { DateRange } from "react-day-picker";
import { describe, expect, it, vi } from "vitest";

import {
  endDay,
  middleDay,
  pastEndDay,
  pastMonth,
  pastStartDay,
  startDay,
  today,
} from "@/test/date.mocks";
import {
  formatMonthYear,
  longDateNamePattern,
  shortDateNamePattern,
} from "@/test/date.utils";

import {
  DatePickerRange,
  DatePickerRangeSkeleton,
} from "./date-picker-range";

describe("DatePickerRange", () => {
  it("renders a trigger with the default placeholder", () => {
    render(<DatePickerRange />);

    expect(
      screen.getByRole("button", { name: /pick a date range/i }),
    ).toHaveAttribute("data-slot", "date-picker-range-trigger");
    expect(
      screen.getByRole("button", { name: /pick a date range/i }),
    ).toHaveAttribute("data-empty");
  });

  it("shows the formatted range on the trigger", () => {
    render(<DatePickerRange value={{ from: startDay, to: endDay }} />);

    expect(
      screen.getByRole("button", {
        name: shortDateNamePattern(startDay, endDay),
      }),
    ).toBeInTheDocument();
  });

  it("opens the calendar and selects a range", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState<DateRange | null>(null);
      return (
        <div>
          <DatePickerRange
            value={value}
            onValueChange={(range) => setValue(range ?? null)}
            calendarProps={{ numberOfMonths: 1 }}
          />
          <output data-testid="range">
            {value?.from && value.to
              ? `${value.from.getDate()}-${value.to.getDate()}`
              : value?.from
                ? `${value.from.getDate()}-pending`
                : "none"}
          </output>
        </div>
      );
    }

    render(<Harness />);

    await user.click(
      screen.getByRole("button", { name: /pick a date range/i }),
    );

    expect(
      document.querySelector("[data-slot='date-picker-range-content']"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: longDateNamePattern(startDay) }),
    );
    await user.click(
      screen.getByRole("button", { name: longDateNamePattern(middleDay) }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("range")).toHaveTextContent(
        `${startDay.getDate()}-${middleDay.getDate()}`,
      );
    });
  });

  it("does not render the Today button by default", async () => {
    const user = userEvent.setup();
    render(<DatePickerRange />);

    await user.click(
      screen.getByRole("button", { name: /pick a date range/i }),
    );

    expect(
      document.querySelector("[data-slot='date-picker-range-today']"),
    ).not.toBeInTheDocument();
  });

  it("navigates to today without selecting when showTodayButton is true", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DatePickerRange
        value={{ from: pastStartDay, to: pastEndDay }}
        onValueChange={onValueChange}
        showTodayButton
        todayButtonLabel="Hoje"
        calendarProps={{ numberOfMonths: 1 }}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: shortDateNamePattern(pastStartDay, pastEndDay),
      }),
    );

    expect(
      screen.getByRole("grid", { name: formatMonthYear(pastMonth) }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Hoje" }));

    expect(
      screen.getByRole("grid", { name: formatMonthYear(today) }),
    ).toBeInTheDocument();

    expect(onValueChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", {
        name: shortDateNamePattern(pastStartDay, pastEndDay),
      }),
    ).toBeInTheDocument();
  });

  it("respects the disabled state", async () => {
    const user = userEvent.setup();
    render(<DatePickerRange disabled />);

    const trigger = screen.getByRole("button", {
      name: /pick a date range/i,
    });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(
      document.querySelector("[data-slot='date-picker-range-content']"),
    ).not.toBeInTheDocument();
  });
});

describe("DatePickerRangeSkeleton", () => {
  it("renders a skeleton matching the trigger footprint", () => {
    render(
      <DatePickerRangeSkeleton data-testid="date-picker-range-skeleton" />,
    );

    const skeleton = screen.getByTestId("date-picker-range-skeleton");
    expect(skeleton).toHaveAttribute(
      "data-slot",
      "date-picker-range-skeleton",
    );
    expect(skeleton).toHaveClass("h-9");
    expect(skeleton).toHaveClass("w-[300px]");
  });
});
