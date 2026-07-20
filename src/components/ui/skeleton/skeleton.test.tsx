import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a presentational placeholder element", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies the base animation and shape tokens", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("bg-muted");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("merges consumer classNames without dropping the base classes", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-24" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("h-4");
    expect(skeleton).toHaveClass("w-24");
    expect(skeleton).toHaveClass("animate-pulse");
  });
});
