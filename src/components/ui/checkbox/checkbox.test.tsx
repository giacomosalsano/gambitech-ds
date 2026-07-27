import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox, CheckboxSkeleton } from "./checkbox";

const getCheckbox = () => screen.getByRole("checkbox");
const getCheckboxSkeleton = () => screen.getByTestId("checkbox-skeleton");

describe("Checkbox", () => {
  it("renders an unchecked checkbox by default", () => {
    render(<Checkbox />);

    expect(getCheckbox()).toBeInTheDocument();
    expect(getCheckbox()).toHaveAttribute("data-slot", "checkbox");
    expect(getCheckbox()).not.toBeChecked();
  });

  it("toggles and fires onCheckedChange when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);

    await user.click(getCheckbox());

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(getCheckbox()).toBeChecked();
  });

  it("reflects the indeterminate state", () => {
    render(<Checkbox checked="indeterminate" />);

    expect(getCheckbox()).toHaveAttribute("data-state", "indeterminate");
    expect(getCheckbox()).toHaveAttribute("aria-checked", "mixed");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onCheckedChange} />);

    expect(getCheckbox()).toBeDisabled();

    await user.click(getCheckbox());

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("reflects the invalid state via aria-invalid", () => {
    render(<Checkbox aria-invalid />);

    expect(getCheckbox()).toHaveAttribute("aria-invalid", "true");
  });
});

describe("CheckboxSkeleton", () => {
  it("renders a placeholder matching the checkbox footprint", () => {
    render(<CheckboxSkeleton data-testid="checkbox-skeleton" />);

    expect(getCheckboxSkeleton()).toHaveAttribute(
      "data-slot",
      "checkbox-skeleton",
    );
    expect(getCheckboxSkeleton()).toHaveClass("size-4");
    expect(getCheckboxSkeleton()).toHaveClass("animate-pulse");
  });
});
