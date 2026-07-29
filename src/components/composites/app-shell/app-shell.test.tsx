import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellMobileTrigger,
  AppShellSidebar,
  AppShellSkeleton,
} from "./app-shell";

function renderSampleAppShell(
  props: {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    mobileNavTitle?: string;
    sidebarSide?: "left" | "right";
  } = {},
) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    mobileNavTitle,
    sidebarSide = "left",
  } = props;

  return render(
    <AppShell
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      mobileNavTitle={mobileNavTitle}
    >
      <AppShellSidebar side={sidebarSide}>
        <nav aria-label="Primary">
          <a href="/dashboard">Dashboard</a>
        </nav>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <AppShellMobileTrigger />
          <span>Workspace</span>
        </AppShellHeader>
        <AppShellContent>
          <h1>Overview</h1>
        </AppShellContent>
      </AppShellMain>
    </AppShell>,
  );
}

describe("AppShell", () => {
  it("renders the compound layout slots", () => {
    renderSampleAppShell();

    expect(document.querySelector("[data-slot='app-shell']")).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='app-shell-sidebar']"),
    ).toHaveAttribute("data-side", "left");
    expect(
      document.querySelector("[data-slot='app-shell-main']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='app-shell-header']"),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute(
      "data-slot",
      "app-shell-content",
    );
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
  });

  it("opens the mobile navigation drawer from the trigger", async () => {
    const user = userEvent.setup();
    renderSampleAppShell();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Open navigation" }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", { name: "Navigation" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("supports controlled open state via onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <AppShell open={false} onOpenChange={onOpenChange}>
        <AppShellSidebar>
          <a href="/">Home</a>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <AppShellMobileTrigger />
          </AppShellHeader>
          <AppShellContent>Body</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );

    await user.click(
      screen.getByRole("button", { name: "Open navigation" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <AppShell open onOpenChange={onOpenChange}>
        <AppShellSidebar>
          <a href="/">Home</a>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <AppShellMobileTrigger />
          </AppShellHeader>
          <AppShellContent>Body</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("allows overriding mobile labels for i18n", async () => {
    const user = userEvent.setup();
    render(
      <AppShell mobileNavTitle="Navegação">
        <AppShellSidebar>
          <a href="/">Início</a>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <AppShellMobileTrigger aria-label="Abrir navegação" />
          </AppShellHeader>
          <AppShellContent>Conteúdo</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );

    await user.click(
      screen.getByRole("button", { name: "Abrir navegação" }),
    );

    expect(
      within(screen.getByRole("dialog")).getByRole("heading", {
        name: "Navegação",
      }),
    ).toBeInTheDocument();
  });

  it("places the sidebar on the right when side is right", () => {
    renderSampleAppShell({ sidebarSide: "right" });

    expect(
      document.querySelector("[data-slot='app-shell-sidebar']"),
    ).toHaveAttribute("data-side", "right");
    expect(
      document.querySelector("[data-slot='app-shell-sidebar']"),
    ).toHaveClass("order-last");
  });

  it("throws when MobileTrigger is used outside AppShell", () => {
    expect(() => render(<AppShellMobileTrigger />)).toThrow(
      /must be used within <AppShell>/,
    );
  });

  it("renders an AppShellSkeleton matching the shell footprint", () => {
    render(<AppShellSkeleton data-testid="app-shell-skeleton" />);

    const skeleton = screen.getByTestId("app-shell-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "app-shell-skeleton");
    expect(skeleton).toHaveClass("min-h-svh", "w-full");
  });
});
