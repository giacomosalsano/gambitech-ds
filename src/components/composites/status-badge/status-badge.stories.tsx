import type { Meta, StoryObj } from "@storybook/react-vite";

import type { StatusBadgeConfig } from "./status-badge.types";
import { StatusBadge, StatusBadgeSkeleton } from "./status-badge";

const subscriptionStatuses: Record<string, StatusBadgeConfig> = {
  pending: { label: "Pending", variant: "warning" },
  active: { label: "Active", variant: "success" },
  past_due: { label: "Past due", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "secondary" },
};

const appointmentStatuses: Record<string, StatusBadgeConfig> = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  no_show: { label: "No show", variant: "outline" },
};

const meta = {
  title: "Composites/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    status: "active",
    statuses: subscriptionStatuses,
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Subscription: Story = {};

export const AppointmentStrip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.keys(appointmentStatuses).map((status) => (
        <StatusBadge
          key={status}
          status={status}
          statuses={appointmentStatuses}
        />
      ))}
    </div>
  ),
};

export const Localized: Story = {
  args: {
    status: "active",
    statuses: {
      active: { label: "Ativa", variant: "success" },
      pending: { label: "Pendente", variant: "warning" },
    },
  },
};

export const UnknownFallback: Story = {
  args: {
    status: "legacy_state",
    statuses: subscriptionStatuses,
  },
};

export const Skeleton: Story = {
  render: () => <StatusBadgeSkeleton />,
};
