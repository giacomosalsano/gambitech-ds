import type * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemSkeleton,
} from "./radio-group";

const renderGroup = (props: React.ComponentProps<typeof RadioGroup> = {}) =>
  render(
    <RadioGroup aria-label="Plan" {...props}>
      <RadioGroupItem value="a" />
      <RadioGroupItem value="b" />
    </RadioGroup>,
  );

const getRadios = () => screen.getAllByRole("radio");
const getRadio = (index: number) => {
  const radio = getRadios()[index];
  if (!radio) throw new Error(`No radio found at index ${index}`);
  return radio;
};

describe("RadioGroup", () => {
  it("renders a radiogroup with its items", () => {
    renderGroup();

    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "data-slot",
      "radio-group",
    );
    expect(getRadios()).toHaveLength(2);
    expect(getRadio(0)).toHaveAttribute("data-slot", "radio-group-item");
  });

  it("selects an item and fires onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });

    await user.click(getRadio(1));

    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(getRadio(1)).toBeChecked();
    expect(getRadio(0)).not.toBeChecked();
  });

  it("reflects the controlled default value", () => {
    renderGroup({ defaultValue: "a" });

    expect(getRadio(0)).toBeChecked();
  });

  it("stacks vertically by default", () => {
    renderGroup();
    const group = screen.getByRole("radiogroup");

    expect(group).toHaveClass("grid");
    expect(group).toHaveAttribute("aria-orientation", "vertical");
  });

  it("lays options out horizontally when orientation is horizontal", () => {
    renderGroup({ orientation: "horizontal" });
    const group = screen.getByRole("radiogroup");

    expect(group).toHaveClass("flex");
    expect(group).toHaveClass("flex-row");
    expect(group).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("does not select when the group is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup({ disabled: true, onValueChange });

    await user.click(getRadio(0));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(getRadio(0)).toBeDisabled();
  });
});

describe("RadioGroupItemSkeleton", () => {
  it("renders a circular placeholder matching the item footprint", () => {
    render(<RadioGroupItemSkeleton data-testid="radio-skeleton" />);
    const skeleton = screen.getByTestId("radio-skeleton");

    expect(skeleton).toHaveAttribute(
      "data-slot",
      "radio-group-item-skeleton",
    );
    expect(skeleton).toHaveClass("size-4");
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("animate-pulse");
  });
});
