import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

const getSeparator = () => screen.getByTestId("separator");

describe("Separator", () => {
  it("renders a decorative horizontal separator by default", () => {
    render(<Separator data-testid="separator" />);

    expect(getSeparator()).toHaveAttribute("data-slot", "separator");
    expect(getSeparator()).toHaveAttribute("data-orientation", "horizontal");
    expect(getSeparator()).toHaveClass("bg-border");
    // Decorative separators are presentational (no separator role).
    expect(getSeparator()).not.toHaveAttribute("role", "separator");
  });

  it("applies the vertical orientation tokens", () => {
    render(
      <div className="h-10">
        <Separator data-testid="separator" orientation="vertical" />
      </div>,
    );

    expect(getSeparator()).toHaveAttribute("data-orientation", "vertical");
  });

  it("exposes a separator role when decorative is false", () => {
    render(<Separator data-testid="separator" decorative={false} />);

    expect(getSeparator()).toHaveAttribute("role", "separator");
  });

  it("merges consumer classNames without dropping the base classes", () => {
    render(<Separator data-testid="separator" className="my-4" />);

    expect(getSeparator()).toHaveClass("my-4");
    expect(getSeparator()).toHaveClass("bg-border");
  });
});
