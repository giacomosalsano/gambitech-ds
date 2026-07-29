import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  ContextSwitcher,
  ContextSwitcherContent,
  ContextSwitcherItem,
  ContextSwitcherItems,
  ContextSwitcherLabel,
  ContextSwitcherSkeleton,
  ContextSwitcherTrigger,
  ContextSwitcherTriggerLabel,
  ContextSwitcherTriggerValue,
} from "./context-switcher";

function SampleSwitcher(props: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <ContextSwitcher {...props}>
      <ContextSwitcherTrigger>
        <ContextSwitcherTriggerLabel>Viewing as</ContextSwitcherTriggerLabel>
        <ContextSwitcherTriggerValue>
          Acme Corp — Admin
        </ContextSwitcherTriggerValue>
      </ContextSwitcherTrigger>
      <ContextSwitcherContent>
        <ContextSwitcherLabel>Memberships</ContextSwitcherLabel>
        <ContextSwitcherItems>
          <ContextSwitcherItem value="acme-admin">
            <span className="font-medium">Acme Corp</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </ContextSwitcherItem>
          <ContextSwitcherItem value="beta-member">
            <span className="font-medium">Beta Studio</span>
            <span className="text-xs text-muted-foreground">Member</span>
          </ContextSwitcherItem>
        </ContextSwitcherItems>
      </ContextSwitcherContent>
    </ContextSwitcher>
  );
}

describe("ContextSwitcher", () => {
  it("renders the trigger with label and value slots", () => {
    render(<SampleSwitcher defaultValue="acme-admin" />);

    expect(
      document.querySelector("[data-slot='context-switcher-trigger']"),
    ).toBeInTheDocument();
    expect(screen.getByText("Viewing as")).toHaveAttribute(
      "data-slot",
      "context-switcher-trigger-label",
    );
    expect(screen.getByText("Acme Corp — Admin")).toHaveAttribute(
      "data-slot",
      "context-switcher-trigger-value",
    );
  });

  it("opens the menu and lists membership options", async () => {
    const user = userEvent.setup();
    render(<SampleSwitcher defaultValue="acme-admin" />);

    await user.click(screen.getByRole("button"));

    const menu = screen.getByRole("menu");
    expect(menu).toHaveAttribute("data-slot", "context-switcher-content");
    expect(within(menu).getByText("Memberships")).toBeInTheDocument();
    expect(
      within(menu).getByRole("menuitemradio", { name: /Acme Corp/ }),
    ).toBeInTheDocument();
    expect(
      within(menu).getByRole("menuitemradio", { name: /Beta Studio/ }),
    ).toBeInTheDocument();
  });

  it("calls onValueChange when another membership is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <SampleSwitcher value="acme-admin" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button"));
    await user.click(
      screen.getByRole("menuitemradio", { name: /Beta Studio/ }),
    );

    expect(onValueChange).toHaveBeenCalledWith("beta-member");
  });

  it("supports uncontrolled selection via defaultValue", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState("acme-admin");
      return (
        <div>
          <output data-testid="selected">{value}</output>
          <SampleSwitcher
            defaultValue="acme-admin"
            onValueChange={setValue}
          />
        </div>
      );
    }

    render(<Harness />);

    await user.click(screen.getByRole("button"));
    await user.click(
      screen.getByRole("menuitemradio", { name: /Beta Studio/ }),
    );

    expect(screen.getByTestId("selected")).toHaveTextContent("beta-member");
  });

  it("allows localized trigger copy via children", () => {
    render(
      <ContextSwitcher defaultValue="a">
        <ContextSwitcherTrigger>
          <ContextSwitcherTriggerLabel>
            Vendo como
          </ContextSwitcherTriggerLabel>
          <ContextSwitcherTriggerValue>
            Estúdio — Admin
          </ContextSwitcherTriggerValue>
        </ContextSwitcherTrigger>
        <ContextSwitcherContent>
          <ContextSwitcherItems>
            <ContextSwitcherItem value="a">A</ContextSwitcherItem>
          </ContextSwitcherItems>
        </ContextSwitcherContent>
      </ContextSwitcher>,
    );

    expect(screen.getByText("Vendo como")).toBeInTheDocument();
    expect(screen.getByText("Estúdio — Admin")).toBeInTheDocument();
  });

  it("throws when Items is used outside ContextSwitcher", () => {
    expect(() =>
      render(
        <ContextSwitcherItems>
          <ContextSwitcherItem value="a">A</ContextSwitcherItem>
        </ContextSwitcherItems>,
      ),
    ).toThrow(/must be used within <ContextSwitcher>/);
  });

  it("renders a ContextSwitcherSkeleton matching the trigger footprint", () => {
    render(<ContextSwitcherSkeleton data-testid="context-switcher-skeleton" />);

    const skeleton = screen.getByTestId("context-switcher-skeleton");
    expect(skeleton).toHaveAttribute(
      "data-slot",
      "context-switcher-skeleton",
    );
    expect(skeleton).toHaveClass("h-12", "w-56", "rounded-md");
  });
});
