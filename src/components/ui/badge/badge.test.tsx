import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, BadgeSkeleton, badgeVariants } from "./badge";

describe("Badge", () => {
  it("renders its children inside a span by default", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("applies the default variant tokens", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");

    expect(badge).toHaveClass("bg-primary");
    expect(badge).toHaveClass("text-primary-foreground");
  });

  it.each([
    ["success", "bg-success"],
    ["warning", "bg-warning"],
    ["info", "bg-info"],
    ["destructive", "bg-destructive"],
  ] as const)("supports the %s status variant", (variant, expectedClass) => {
    render(<Badge variant={variant}>{variant}</Badge>);

    expect(screen.getByText(variant)).toHaveClass(expectedClass);
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Badge asChild>
        <a href="/status">Status</a>
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Status" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-slot", "badge");
  });

  it("exposes badgeVariants for consumers", () => {
    expect(typeof badgeVariants).toBe("function");
    expect(badgeVariants({ variant: "outline" })).toContain("text-foreground");
  });
});

describe("BadgeSkeleton", () => {
  it("renders a skeleton placeholder matching the badge footprint", () => {
    render(<BadgeSkeleton data-testid="badge-skeleton" />);
    const skeleton = screen.getByTestId("badge-skeleton");

    expect(skeleton).toHaveAttribute("data-slot", "badge-skeleton");
    expect(skeleton).toHaveClass("h-5");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("allows overriding the width via className", () => {
    render(<BadgeSkeleton data-testid="badge-skeleton" className="w-24" />);

    expect(screen.getByTestId("badge-skeleton")).toHaveClass("w-24");
  });
});
