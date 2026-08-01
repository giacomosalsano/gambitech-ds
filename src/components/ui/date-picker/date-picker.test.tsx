import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { pastDay, pastMonth, selectedDay, today } from "@/test/date.mocks";
import {
  formatMonthYear,
  longDateNamePattern,
  mediumDateNamePattern,
} from "@/test/date.utils";

import { DatePicker, DatePickerSkeleton } from "./date-picker";

describe("DatePicker", () => {
  it("renders a trigger with the default placeholder", () => {
    render(<DatePicker />);

    expect(
      screen.getByRole("button", { name: /pick a date/i }),
    ).toHaveAttribute("data-slot", "date-picker-trigger");
    expect(
      screen.getByRole("button", { name: /pick a date/i }),
    ).toHaveAttribute("data-empty");
  });

  it("shows the formatted value on the trigger", () => {
    render(<DatePicker value={selectedDay} />);

    expect(
      screen.getByRole("button", { name: mediumDateNamePattern(selectedDay) }),
    ).toBeInTheDocument();
  });

  it("opens the calendar and selects a date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(<DatePicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /pick a date/i }));

    expect(
      document.querySelector("[data-slot='date-picker-content']"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: longDateNamePattern(selectedDay) }),
    );

    expect(onValueChange).toHaveBeenCalled();
    const selected = onValueChange.mock.calls[0]?.[0] as Date;
    expect(selected.getFullYear()).toBe(selectedDay.getFullYear());
    expect(selected.getMonth()).toBe(selectedDay.getMonth());
    expect(selected.getDate()).toBe(selectedDay.getDate());
  });

  it("does not render the Today button by default", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole("button", { name: /pick a date/i }));

    expect(
      document.querySelector("[data-slot='date-picker-today']"),
    ).not.toBeInTheDocument();
  });

  it("navigates to today without selecting when showTodayButton is true", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DatePicker
        value={pastDay}
        onValueChange={onValueChange}
        showTodayButton
        todayButtonLabel="Hoje"
      />,
    );

    await user.click(
      screen.getByRole("button", { name: mediumDateNamePattern(pastDay) }),
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
      screen.getByRole("button", { name: mediumDateNamePattern(pastDay) }),
    ).toBeInTheDocument();
  });

  it("respects the disabled state", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    const trigger = screen.getByRole("button", { name: /pick a date/i });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(
      document.querySelector("[data-slot='date-picker-content']"),
    ).not.toBeInTheDocument();
  });
});

describe("DatePickerSkeleton", () => {
  it("renders a skeleton matching the trigger footprint", () => {
    render(<DatePickerSkeleton data-testid="date-picker-skeleton" />);

    const skeleton = screen.getByTestId("date-picker-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "date-picker-skeleton");
    expect(skeleton).toHaveClass("h-9");
    expect(skeleton).toHaveClass("w-[280px]");
  });
});
