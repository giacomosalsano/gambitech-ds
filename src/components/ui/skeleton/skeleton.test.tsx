import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

const getSkeleton = () => screen.getByTestId("skeleton");

describe("Skeleton", () => {
  it("renders a presentational placeholder element", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(getSkeleton()).toBeInTheDocument();
    expect(getSkeleton()).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies the base animation and shape tokens", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(getSkeleton()).toHaveClass("animate-pulse");
    expect(getSkeleton()).toHaveClass("bg-muted");
    expect(getSkeleton()).toHaveClass("rounded-md");
  });

  it("merges consumer classNames without dropping the base classes", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-24" />);

    expect(getSkeleton()).toHaveClass("h-4");
    expect(getSkeleton()).toHaveClass("w-24");
    expect(getSkeleton()).toHaveClass("animate-pulse");
  });
});
