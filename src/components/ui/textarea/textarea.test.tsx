import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Textarea, TextareaSkeleton } from "./textarea";

const getTextarea = () => screen.getByRole("textbox");
const getTextareaSkeleton = () => screen.getByTestId("textarea-skeleton");

describe("Textarea", () => {
  it("renders a textarea element with the base slot", () => {
    render(<Textarea placeholder="Message" />);

    expect(getTextarea().tagName).toBe("TEXTAREA");
    expect(getTextarea()).toHaveAttribute("data-slot", "textarea");
  });

  it("accepts multiline user input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Message" />);

    await user.type(getTextarea(), "line one{enter}line two");

    expect(getTextarea()).toHaveValue("line one\nline two");
  });

  it("reflects the invalid state via aria-invalid", () => {
    render(<Textarea aria-invalid />);

    expect(getTextarea()).toHaveAttribute("aria-invalid", "true");
    expect(getTextarea()).toHaveClass("aria-invalid:border-destructive");
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    render(<Textarea disabled />);

    expect(getTextarea()).toBeDisabled();

    await user.type(getTextarea(), "hello");

    expect(getTextarea()).toHaveValue("");
  });
});

describe("TextareaSkeleton", () => {
  it("renders a placeholder matching the textarea footprint", () => {
    render(<TextareaSkeleton data-testid="textarea-skeleton" />);

    expect(getTextareaSkeleton()).toHaveAttribute(
      "data-slot",
      "textarea-skeleton",
    );
    expect(getTextareaSkeleton()).toHaveClass("h-16");
    expect(getTextareaSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding the height via className", () => {
    render(<TextareaSkeleton data-testid="textarea-skeleton" className="h-24" />);

    expect(getTextareaSkeleton()).toHaveClass("h-24");
  });
});
