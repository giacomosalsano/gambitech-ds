import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

const meta = {
  title: "Composites/ContextSwitcher",
  component: ContextSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ContextSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

const memberships = [
  { value: "acme-admin", title: "Acme Corp", role: "Admin" },
  { value: "beta-member", title: "Beta Studio", role: "Member" },
  { value: "gamma-owner", title: "Gamma Laundry", role: "Owner" },
] as const;

function DemoSwitcher({
  triggerLabel = "Viewing as",
  groupLabel = "Memberships",
}: {
  triggerLabel?: string;
  groupLabel?: string;
}) {
  const [value, setValue] = useState<string>(memberships[0].value);
  const current =
    memberships.find((item) => item.value === value) ?? memberships[0];

  return (
    <ContextSwitcher value={value} onValueChange={setValue}>
      <ContextSwitcherTrigger>
        <ContextSwitcherTriggerLabel>
          {triggerLabel}
        </ContextSwitcherTriggerLabel>
        <ContextSwitcherTriggerValue>
          {current.title} — {current.role}
        </ContextSwitcherTriggerValue>
      </ContextSwitcherTrigger>
      <ContextSwitcherContent>
        <ContextSwitcherLabel>{groupLabel}</ContextSwitcherLabel>
        <ContextSwitcherItems>
          {memberships.map((item) => (
            <ContextSwitcherItem key={item.value} value={item.value}>
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.role}</span>
            </ContextSwitcherItem>
          ))}
        </ContextSwitcherItems>
      </ContextSwitcherContent>
    </ContextSwitcher>
  );
}

export const Default: Story = {
  render: () => <DemoSwitcher />,
};

export const Localized: Story = {
  render: () => (
    <DemoSwitcher triggerLabel="Vendo como" groupLabel="Vínculos" />
  ),
};

export const Skeleton: Story = {
  render: () => <ContextSwitcherSkeleton />,
};
