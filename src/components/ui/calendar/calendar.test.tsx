import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { DateRange } from "react-day-picker";
import { describe, expect, it } from "vitest";

import { Calendar, CalendarSkeleton } from "./calendar";

const getCalendar = () =>
  document.querySelector("[data-slot='calendar']") as HTMLElement;
const getCalendarSkeleton = () => screen.getByTestId("calendar-skeleton");

describe("Calendar", () => {
  it("renders the day picker root with the calendar data-slot", () => {
    render(<Calendar />);

    expect(getCalendar()).toBeInTheDocument();
    expect(getCalendar()).toHaveAttribute("data-slot", "calendar");
  });

  it("exposes a labeled month grid", () => {
    render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);

    expect(
      screen.getByRole("grid", { name: "July 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/july/i);
  });

  it("selects a single day when mode is single", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [selected, setSelected] = useState<Date | undefined>();
      return (
        <div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2026, 6, 15)}
          />
          <output data-testid="selected">
            {selected
              ? `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, "0")}-${String(selected.getDate()).padStart(2, "0")}`
              : "none"}
          </output>
        </div>
      );
    }

    render(<Harness />);

    const day = new Date(2026, 6, 15).toLocaleDateString();
    const dayButton = document.querySelector(
      `[data-day="${day}"]`,
    ) as HTMLButtonElement;
    expect(dayButton).toBeTruthy();

    await user.click(dayButton);

    expect(screen.getByTestId("selected")).toHaveTextContent("2026-07-15");
    expect(document.querySelector(`[data-day="${day}"]`)).toHaveAttribute(
      "data-selected-single",
      "true",
    );
  });

  it("supports range selection mode", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [selected, setSelected] = useState<DateRange | undefined>();
      return (
        <Calendar
          mode="range"
          selected={selected}
          onSelect={setSelected}
          defaultMonth={new Date(2026, 6, 1)}
          numberOfMonths={1}
        />
      );
    }

    render(<Harness />);

    await user.click(
      document.querySelector(
        `[data-day="${new Date(2026, 6, 10).toLocaleDateString()}"]`,
      ) as HTMLButtonElement,
    );
    await user.click(
      document.querySelector(
        `[data-day="${new Date(2026, 6, 15).toLocaleDateString()}"]`,
      ) as HTMLButtonElement,
    );

    expect(
      getCalendar().querySelector("[data-range-start='true']"),
    ).toBeInTheDocument();
    expect(
      getCalendar().querySelector("[data-range-end='true']"),
    ).toBeInTheDocument();
  });

  it("navigates to the next month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);

    await user.click(
      screen.getByRole("button", { name: "Go to the Next Month" }),
    );

    expect(screen.getByRole("grid", { name: "August 2026" })).toBeInTheDocument();
  });
});

describe("CalendarSkeleton", () => {
  it("renders a skeleton placeholder matching the calendar footprint", () => {
    render(<CalendarSkeleton data-testid="calendar-skeleton" />);

    expect(getCalendarSkeleton()).toHaveAttribute(
      "data-slot",
      "calendar-skeleton",
    );
    expect(getCalendarSkeleton()).toHaveClass("h-72");
    expect(getCalendarSkeleton()).toHaveClass("animate-pulse");
  });
});
