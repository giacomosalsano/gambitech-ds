import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSkeleton,
  EmptyStateTitle,
} from "./empty-state";

describe("EmptyState", () => {
  it("renders icon, title, description and action slots", () => {
    render(
      <EmptyState data-testid="empty-state">
        <EmptyStateIcon>
          <Inbox aria-hidden="true" />
        </EmptyStateIcon>
        <EmptyStateTitle>No subscriptions</EmptyStateTitle>
        <EmptyStateDescription>
          Subscribe to a plan to get started.
        </EmptyStateDescription>
        <EmptyStateAction>
          <Button>Browse plans</Button>
        </EmptyStateAction>
      </EmptyState>,
    );

    expect(screen.getByTestId("empty-state")).toHaveAttribute(
      "data-slot",
      "empty-state",
    );
    expect(screen.getByTestId("empty-state")).toHaveAttribute(
      "role",
      "status",
    );
    expect(
      document.querySelector("[data-slot='empty-state-icon']"),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No subscriptions" })).toHaveAttribute(
      "data-slot",
      "empty-state-title",
    );
    expect(
      screen.getByText("Subscribe to a plan to get started."),
    ).toHaveAttribute("data-slot", "empty-state-description");
    expect(
      document.querySelector("[data-slot='empty-state-action']"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Browse plans" }),
    ).toBeInTheDocument();
  });

  it("allows localized copy via children", () => {
    render(
      <EmptyState>
        <EmptyStateTitle>Nenhuma assinatura</EmptyStateTitle>
        <EmptyStateDescription>
          Assine um plano para começar.
        </EmptyStateDescription>
      </EmptyState>,
    );

    expect(screen.getByText("Nenhuma assinatura")).toBeInTheDocument();
    expect(screen.getByText("Assine um plano para começar.")).toBeInTheDocument();
  });

  it("merges consumer classNames without dropping base classes", () => {
    render(
      <EmptyState data-testid="empty-state" className="border">
        <EmptyStateTitle className="text-primary">Empty</EmptyStateTitle>
      </EmptyState>,
    );

    expect(screen.getByTestId("empty-state")).toHaveClass("border", "flex");
    expect(screen.getByText("Empty")).toHaveClass("text-primary", "font-semibold");
  });

  it("renders an EmptyStateSkeleton matching the empty footprint", () => {
    render(<EmptyStateSkeleton data-testid="empty-state-skeleton" />);

    const skeleton = screen.getByTestId("empty-state-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "empty-state-skeleton");
    expect(skeleton).toHaveClass("h-40", "w-72", "rounded-xl");
  });
});
