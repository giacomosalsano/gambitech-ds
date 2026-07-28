import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsSkeleton,
  TabsTrigger,
} from "./tabs";

function renderSampleTabs(
  props: {
    orientation?: "horizontal" | "vertical";
    listVariant?: "default" | "line";
    defaultValue?: string;
  } = {},
) {
  const {
    orientation = "horizontal",
    listVariant = "default",
    defaultValue = "account",
  } = props;

  return render(
    <Tabs defaultValue={defaultValue} orientation={orientation}>
      <TabsList variant={listVariant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders a tablist with triggers and shows the default panel", () => {
    renderSampleTabs();

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-slot",
      "tabs-list",
    );
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account panel");
    expect(
      document.querySelector("[data-slot='tabs']"),
    ).toHaveAttribute("data-orientation", "horizontal");
  });

  it("switches panels when another trigger is activated", async () => {
    const user = userEvent.setup();
    renderSampleTabs();

    await user.click(screen.getByRole("tab", { name: "Password" }));

    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Password panel");
  });

  it("does not activate a disabled trigger", async () => {
    const user = userEvent.setup();
    renderSampleTabs();

    const disabled = screen.getByRole("tab", { name: "Disabled" });
    expect(disabled).toBeDisabled();

    await user.click(disabled);

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account panel");
  });

  it("applies vertical orientation and line list variant tokens", () => {
    renderSampleTabs({ orientation: "vertical", listVariant: "line" });

    expect(document.querySelector("[data-slot='tabs']")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-variant",
      "line",
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("renders a TabsSkeleton matching the list footprint", () => {
    render(<TabsSkeleton data-testid="tabs-skeleton" />);

    const skeleton = screen.getByTestId("tabs-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "tabs-skeleton");
    expect(skeleton).toHaveClass("h-9", "w-64", "rounded-lg");
  });
});
