import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Alert,
  AlertDescription,
  AlertSkeleton,
  AlertTitle,
  alertVariants,
} from "./alert";

const getAlert = () => screen.getByRole("alert");
const getAlertSkeleton = () => screen.getByTestId("alert-skeleton");

describe("Alert", () => {
  it("renders as a role=alert region with compound parts", () => {
    render(
      <Alert>
        <CircleAlert />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something needs attention.</AlertDescription>
      </Alert>,
    );

    expect(getAlert()).toHaveAttribute("data-slot", "alert");
    expect(screen.getByText("Heads up").closest("[data-slot]")).toHaveAttribute(
      "data-slot",
      "alert-title",
    );
    expect(
      screen.getByText("Something needs attention.").closest("[data-slot]"),
    ).toHaveAttribute("data-slot", "alert-description");
  });

  it("applies the default variant tokens", () => {
    render(
      <Alert>
        <AlertTitle>Default</AlertTitle>
      </Alert>,
    );

    expect(getAlert()).toHaveClass("bg-card");
    expect(getAlert()).toHaveClass("text-card-foreground");
  });

  it.each([
    ["destructive", "text-destructive"],
    ["success", "text-success"],
    ["warning", "text-warning"],
    ["info", "text-info"],
  ] as const)("supports the %s status variant", (variant, expectedClass) => {
    render(
      <Alert variant={variant}>
        <AlertTitle>{variant}</AlertTitle>
      </Alert>,
    );

    expect(getAlert()).toHaveClass(expectedClass);
  });

  it("merges consumer classNames without dropping the base classes", () => {
    render(
      <Alert className="mb-4">
        <Info />
        <AlertTitle>Info</AlertTitle>
      </Alert>,
    );

    expect(getAlert()).toHaveClass("mb-4");
    expect(getAlert()).toHaveClass("rounded-lg");
  });

  it("exposes alertVariants for consumers", () => {
    expect(typeof alertVariants).toBe("function");
    expect(alertVariants({ variant: "warning" })).toContain("text-warning");
  });

  it("renders an icon child without breaking the grid layout classes", () => {
    render(
      <Alert variant="warning">
        <TriangleAlert data-testid="alert-icon" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Check your input.</AlertDescription>
      </Alert>,
    );

    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    expect(getAlert()).toHaveClass("has-[>svg]:gap-x-3");
  });
});

describe("AlertSkeleton", () => {
  it("renders a skeleton placeholder matching the alert footprint", () => {
    render(<AlertSkeleton data-testid="alert-skeleton" />);

    expect(getAlertSkeleton()).toHaveAttribute("data-slot", "alert-skeleton");
    expect(getAlertSkeleton()).toHaveClass("h-16");
    expect(getAlertSkeleton()).toHaveClass("rounded-lg");
    expect(getAlertSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding dimensions via className", () => {
    render(<AlertSkeleton data-testid="alert-skeleton" className="h-20" />);

    expect(getAlertSkeleton()).toHaveClass("h-20");
  });
});
