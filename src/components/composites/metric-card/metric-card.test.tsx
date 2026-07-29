import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MetricCard,
  MetricCardEmpty,
  MetricCardLabel,
  MetricCardSkeleton,
  MetricCardValue,
} from "./metric-card";

describe("MetricCard", () => {
  it("renders label and value with expected data-slots", () => {
    render(
      <MetricCard data-testid="metric-card">
        <MetricCardLabel>Revenue</MetricCardLabel>
        <MetricCardValue>R$ 1.200,00</MetricCardValue>
      </MetricCard>,
    );

    expect(screen.getByTestId("metric-card")).toHaveAttribute(
      "data-slot",
      "metric-card",
    );
    expect(screen.getByText("Revenue")).toHaveAttribute(
      "data-slot",
      "metric-card-label",
    );
    expect(screen.getByText("R$ 1.200,00")).toHaveAttribute(
      "data-slot",
      "metric-card-value",
    );
    expect(screen.getByText("R$ 1.200,00")).toHaveClass("tabular-nums");
  });

  it("renders an empty state instead of a value", () => {
    render(
      <MetricCard>
        <MetricCardLabel>Average rating</MetricCardLabel>
        <MetricCardEmpty>No ratings</MetricCardEmpty>
      </MetricCard>,
    );

    expect(screen.getByText("No ratings")).toHaveAttribute(
      "data-slot",
      "metric-card-empty",
    );
    expect(
      document.querySelector("[data-slot='metric-card-value']"),
    ).not.toBeInTheDocument();
  });

  it("allows localized empty copy via children", () => {
    render(
      <MetricCard>
        <MetricCardLabel>Nota média</MetricCardLabel>
        <MetricCardEmpty>Sem avaliações</MetricCardEmpty>
      </MetricCard>,
    );

    expect(screen.getByText("Sem avaliações")).toBeInTheDocument();
  });

  it("merges consumer classNames without dropping base tokens", () => {
    render(
      <MetricCard data-testid="metric-card" className="w-56">
        <MetricCardLabel className="uppercase">Hours</MetricCardLabel>
        <MetricCardValue className="text-primary">42</MetricCardValue>
      </MetricCard>,
    );

    expect(screen.getByTestId("metric-card")).toHaveClass("w-56", "bg-card");
    expect(screen.getByText("Hours")).toHaveClass(
      "uppercase",
      "text-muted-foreground",
    );
    expect(screen.getByText("42")).toHaveClass("text-primary", "text-2xl");
  });

  it("renders a MetricCardSkeleton matching the metric footprint", () => {
    render(<MetricCardSkeleton data-testid="metric-card-skeleton" />);

    const skeleton = screen.getByTestId("metric-card-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "metric-card-skeleton");
    expect(skeleton).toHaveClass("h-24", "w-48", "rounded-xl");
  });
});
