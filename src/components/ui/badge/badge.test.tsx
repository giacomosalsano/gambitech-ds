import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, BadgeSkeleton, badgeVariants } from "./badge";

let badgeText = "New";
const getBadge = () => screen.getByText(badgeText);
const getLink = () => screen.getByRole("link", { name: badgeText });
const getBadgeSkeleton = () => screen.getByTestId("badge-skeleton");

describe("Badge", () => {
  it("renders its children inside a span by default", () => {
    render(<Badge>{badgeText}</Badge>);

    expect(getBadge().tagName).toBe("SPAN");
    expect(getBadge()).toHaveAttribute("data-slot", "badge");
  });

  it("applies the default variant tokens", () => {
    badgeText = "Default";
    render(<Badge>{badgeText}</Badge>);

    expect(getBadge()).toHaveClass("bg-primary");
    expect(getBadge()).toHaveClass("text-primary-foreground");
  });

  it.each([
    ["success", "bg-success"],
    ["warning", "bg-warning"],
    ["info", "bg-info"],
    ["destructive", "bg-destructive"],
  ] as const)("supports the %s status variant", (variant, expectedClass) => {
    badgeText = variant;
    render(<Badge variant={variant}>{variant}</Badge>);

    expect(getBadge()).toHaveClass(expectedClass);
  });

  it("renders as the child element when asChild is set", () => {
    badgeText = "Status";
    render(
      <Badge asChild>
        <a href="/status">{badgeText}</a>
      </Badge>,
    );

    expect(getLink()).toBeInTheDocument();
    expect(getLink()).toHaveAttribute("data-slot", "badge");
  });

  it("exposes badgeVariants for consumers", () => {
    expect(typeof badgeVariants).toBe("function");
    expect(badgeVariants({ variant: "outline" })).toContain("text-foreground");
  });
});

describe("BadgeSkeleton", () => {
  it("renders a skeleton placeholder matching the badge footprint", () => {
    render(<BadgeSkeleton data-testid="badge-skeleton" />);

    expect(getBadgeSkeleton()).toHaveAttribute("data-slot", "badge-skeleton");
    expect(getBadgeSkeleton()).toHaveClass("h-5");
    expect(getBadgeSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding the width via className", () => {
    render(<BadgeSkeleton data-testid="badge-skeleton" className="w-24" />);

    expect(getBadgeSkeleton()).toHaveClass("w-24");
  });
});
