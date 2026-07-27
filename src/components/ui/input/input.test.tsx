import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input, InputSkeleton } from "./input";

const getInput = () => screen.getByRole("textbox");
const getInputSkeleton = () => screen.getByTestId("input-skeleton");

describe("Input", () => {
  it("renders an input element with the base slot", () => {
    render(<Input placeholder="Email" />);

    expect(getInput()).toBeInTheDocument();
    expect(getInput()).toHaveAttribute("data-slot", "input");
  });

  it("accepts user text input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Email" />);

    await user.type(getInput(), "hello");

    expect(getInput()).toHaveValue("hello");
  });

  it("forwards the type attribute", () => {
    render(<Input type="password" data-testid="password" />);

    expect(screen.getByTestId("password")).toHaveAttribute("type", "password");
  });

  it("reflects the invalid state via aria-invalid", () => {
    render(<Input aria-invalid />);

    expect(getInput()).toHaveAttribute("aria-invalid", "true");
    expect(getInput()).toHaveClass("aria-invalid:border-destructive");
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    render(<Input disabled />);

    expect(getInput()).toBeDisabled();

    await user.type(getInput(), "hello");

    expect(getInput()).toHaveValue("");
  });
});

describe("InputSkeleton", () => {
  it("renders a placeholder matching the input footprint", () => {
    render(<InputSkeleton data-testid="input-skeleton" />);

    expect(getInputSkeleton()).toHaveAttribute("data-slot", "input-skeleton");
    expect(getInputSkeleton()).toHaveClass("h-9");
    expect(getInputSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding the width via className", () => {
    render(<InputSkeleton data-testid="input-skeleton" className="w-40" />);

    expect(getInputSkeleton()).toHaveClass("w-40");
  });
});
