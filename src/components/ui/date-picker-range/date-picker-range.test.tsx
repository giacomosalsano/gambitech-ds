import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { DateRange } from "react-day-picker";
import { describe, expect, it, vi } from "vitest";

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
    render(
      <DatePickerRange
        value={{
          from: new Date(2026, 6, 10),
          to: new Date(2026, 6, 18),
        }}
      />,
    );

    expect(
      screen.getByRole("button", { name: /jul 10, 2026.*jul 18, 2026/i }),
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
      screen.getByRole("button", { name: /Friday, July 10th, 2026/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /Wednesday, July 15th, 2026/i }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("range")).toHaveTextContent("10-15");
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
    const today = new Date();

    render(
      <DatePickerRange
        value={{
          from: new Date(2024, 0, 10),
          to: new Date(2024, 0, 18),
        }}
        onValueChange={onValueChange}
        showTodayButton
        todayButtonLabel="Hoje"
        calendarProps={{ numberOfMonths: 1 }}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /jan 10, 2024.*jan 18, 2024/i }),
    );

    expect(
      screen.getByRole("grid", { name: /january 2024/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Hoje" }));

    const monthName = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();
    expect(
      screen.getByRole("grid", { name: `${monthName} ${year}` }),
    ).toBeInTheDocument();

    expect(onValueChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: /jan 10, 2024.*jan 18, 2024/i }),
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
