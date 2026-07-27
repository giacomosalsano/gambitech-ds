import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Label } from "./label";

let labelText = "Email";
const getLabel = () => screen.getByText(labelText);

describe("Label", () => {
  it("renders a label element with its children", () => {
    render(<Label>{labelText}</Label>);

    expect(getLabel().tagName).toBe("LABEL");
    expect(getLabel()).toHaveAttribute("data-slot", "label");
  });

  it("associates with a control via htmlFor and focuses it on click", async () => {
    labelText = "Username";
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="username">{labelText}</Label>
        <input id="username" />
      </>,
    );

    expect(getLabel()).toHaveAttribute("for", "username");

    await user.click(getLabel());

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("merges consumer classNames without dropping base classes", () => {
    labelText = "Custom";
    render(<Label className="text-destructive">{labelText}</Label>);

    expect(getLabel()).toHaveClass("text-destructive");
    expect(getLabel()).toHaveClass("font-medium");
  });
});
