import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "@/components/ui/separator";

import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellMobileTrigger,
  AppShellSidebar,
  AppShellSkeleton,
} from "./app-shell";

const meta = {
  title: "Composites/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoNav() {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="px-2 text-sm font-semibold">Acme</div>
      <Separator className="bg-sidebar-border" />
      <nav aria-label="Primary" className="flex flex-col gap-1 text-sm">
        <a
          className="rounded-md bg-sidebar-accent px-2 py-1.5 text-sidebar-accent-foreground"
          href="#dashboard"
        >
          Dashboard
        </a>
        <a
          className="rounded-md px-2 py-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          href="#team"
        >
          Team
        </a>
        <a
          className="rounded-md px-2 py-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          href="#settings"
        >
          Settings
        </a>
      </nav>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar>
        <DemoNav />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <AppShellMobileTrigger />
          <div className="font-medium">Overview</div>
        </AppShellHeader>
        <AppShellContent className="gap-2 p-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Sidebar on desktop; use the menu button for the mobile drawer.
          </p>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};

export const RightSidebar: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar side="right">
        <DemoNav />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <AppShellMobileTrigger />
          <div className="font-medium">Right rail</div>
        </AppShellHeader>
        <AppShellContent className="p-6 text-sm text-muted-foreground">
          Sidebar and mobile sheet open from the right.
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};

export const LocalizedLabels: Story = {
  render: () => (
    <AppShell mobileNavTitle="Navegação">
      <AppShellSidebar>
        <DemoNav />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <AppShellMobileTrigger aria-label="Abrir navegação" />
          <div className="font-medium">Painel</div>
        </AppShellHeader>
        <AppShellContent className="p-6 text-sm text-muted-foreground">
          Labels overridable for i18n.
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};

export const Skeleton: Story = {
  render: () => <AppShellSkeleton />,
};
