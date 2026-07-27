import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch, SwitchSkeleton } from "./switch";

const getSwitch = () => screen.getByRole("switch");
const getSwitchSkeleton = () => screen.getByTestId("switch-skeleton");

describe("Switch", () => {
  it("renders an unchecked switch by default", () => {
    render(<Switch />);

    expect(getSwitch()).toBeInTheDocument();
    expect(getSwitch()).toHaveAttribute("data-slot", "switch");
    expect(getSwitch()).not.toBeChecked();
  });

  it("toggles and fires onCheckedChange when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);

    await user.click(getSwitch());

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(getSwitch()).toBeChecked();
  });

  it("reflects the controlled checked state", () => {
    render(<Switch checked onCheckedChange={() => {}} />);

    expect(getSwitch()).toBeChecked();
    expect(getSwitch()).toHaveAttribute("data-state", "checked");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);

    expect(getSwitch()).toBeDisabled();

    await user.click(getSwitch());

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("reflects the invalid state via aria-invalid", () => {
    render(<Switch aria-invalid />);

    expect(getSwitch()).toHaveAttribute("aria-invalid", "true");
  });
});

describe("SwitchSkeleton", () => {
  it("renders a placeholder matching the switch footprint", () => {
    render(<SwitchSkeleton data-testid="switch-skeleton" />);

    expect(getSwitchSkeleton()).toHaveAttribute("data-slot", "switch-skeleton");
    expect(getSwitchSkeleton()).toHaveClass("h-5");
    expect(getSwitchSkeleton()).toHaveClass("w-9");
    expect(getSwitchSkeleton()).toHaveClass("animate-pulse");
  });
});
