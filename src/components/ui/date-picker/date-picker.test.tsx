import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

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
    render(<DatePicker value={new Date(2026, 6, 15)} />);

    expect(
      screen.getByRole("button", { name: /july 15th, 2026/i }),
    ).toBeInTheDocument();
  });

  it("opens the calendar and selects a date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DatePicker
        defaultValue={undefined}
        onValueChange={onValueChange}
        calendarProps={{ defaultMonth: new Date(2026, 6, 1) }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /pick a date/i }));

    expect(
      document.querySelector("[data-slot='date-picker-content']"),
    ).toBeInTheDocument();

    const day = new Date(2026, 6, 15).toLocaleDateString();
    await user.click(
      document.querySelector(`[data-day="${day}"]`) as HTMLButtonElement,
    );

    expect(onValueChange).toHaveBeenCalled();
    const selected = onValueChange.mock.calls[0]?.[0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(6);
    expect(selected.getDate()).toBe(15);
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
    const today = new Date();

    render(
      <DatePicker
        value={new Date(2024, 0, 10)}
        onValueChange={onValueChange}
        showTodayButton
        todayButtonLabel="Hoje"
        calendarProps={{ defaultMonth: new Date(2024, 0, 1) }}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /january 10th, 2024/i }),
    );

    expect(screen.getByRole("grid", { name: /january 2024/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Hoje" }));

    const monthName = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();
    expect(
      screen.getByRole("grid", { name: `${monthName} ${year}` }),
    ).toBeInTheDocument();

    expect(onValueChange).not.toHaveBeenCalled();
    // Selection stays on the previous value.
    expect(
      screen.getByRole("button", { name: /january 10th, 2024/i }),
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
