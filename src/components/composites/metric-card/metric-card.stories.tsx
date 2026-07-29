import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  MetricCard,
  MetricCardEmpty,
  MetricCardLabel,
  MetricCardSkeleton,
  MetricCardValue,
} from "./metric-card";

const meta = {
  title: "Composites/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MetricCard className="w-56">
      <MetricCardLabel>Revenue</MetricCardLabel>
      <MetricCardValue>R$ 1.200,00</MetricCardValue>
    </MetricCard>
  ),
};

export const Empty: Story = {
  render: () => (
    <MetricCard className="w-56">
      <MetricCardLabel>Average rating</MetricCardLabel>
      <MetricCardEmpty>No ratings</MetricCardEmpty>
    </MetricCard>
  ),
};

export const LocalizedEmpty: Story = {
  render: () => (
    <MetricCard className="w-56">
      <MetricCardLabel>Nota média</MetricCardLabel>
      <MetricCardEmpty>Sem avaliações</MetricCardEmpty>
    </MetricCard>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid w-[36rem] grid-cols-2 gap-4">
      <MetricCard>
        <MetricCardLabel>Revenue</MetricCardLabel>
        <MetricCardValue>R$ 4.850,00</MetricCardValue>
      </MetricCard>
      <MetricCard>
        <MetricCardLabel>Appointments</MetricCardLabel>
        <MetricCardValue>128</MetricCardValue>
      </MetricCard>
      <MetricCard>
        <MetricCardLabel>Hours</MetricCardLabel>
        <MetricCardValue>86.5</MetricCardValue>
      </MetricCard>
      <MetricCard>
        <MetricCardLabel>Average rating</MetricCardLabel>
        <MetricCardEmpty>No ratings</MetricCardEmpty>
      </MetricCard>
    </div>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <div className="flex gap-4">
      <MetricCardSkeleton />
      <MetricCardSkeleton />
    </div>
  ),
};
