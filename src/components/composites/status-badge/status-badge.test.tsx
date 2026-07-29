import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { StatusBadgeConfig } from "./status-badge.types";
import { StatusBadge, StatusBadgeSkeleton } from "./status-badge";

const subscriptionStatuses: Record<string, StatusBadgeConfig> = {
  active: { label: "Active", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

describe("StatusBadge", () => {
  it("maps status keys to label and badge variant", () => {
    render(
      <StatusBadge
        data-testid="status-badge"
        status="active"
        statuses={subscriptionStatuses}
      />,
    );

    const badge = screen.getByTestId("status-badge");
    expect(badge).toHaveAttribute("data-slot", "status-badge");
    expect(badge).toHaveAttribute("data-status", "active");
    expect(badge).toHaveTextContent("Active");
    expect(badge).toHaveClass("bg-success");
  });

  it("falls back to outline + raw status when the key is unknown", () => {
    render(
      <StatusBadge
        data-testid="status-badge"
        status="unknown"
        statuses={subscriptionStatuses}
      />,
    );

    const badge = screen.getByTestId("status-badge");
    expect(badge).toHaveTextContent("unknown");
    expect(badge).toHaveClass("text-foreground"); // outline variant
  });

  it("allows localized labels via the statuses map", () => {
    render(
      <StatusBadge
        status="active"
        statuses={{
          active: { label: "Ativa", variant: "success" },
        }}
      />,
    );

    expect(screen.getByText("Ativa")).toBeInTheDocument();
  });

  it("renders a StatusBadgeSkeleton matching the badge footprint", () => {
    render(<StatusBadgeSkeleton data-testid="status-badge-skeleton" />);

    const skeleton = screen.getByTestId("status-badge-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "status-badge-skeleton");
    expect(skeleton).toHaveClass("h-5", "w-16", "rounded-md");
  });
});
