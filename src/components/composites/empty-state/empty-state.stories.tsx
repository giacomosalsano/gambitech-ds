import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inbox, PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSkeleton,
  EmptyStateTitle,
} from "./empty-state";

const meta = {
  title: "Composites/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState className="w-96 rounded-xl border">
      <EmptyStateIcon>
        <Inbox aria-hidden="true" />
      </EmptyStateIcon>
      <EmptyStateTitle>No subscriptions</EmptyStateTitle>
      <EmptyStateDescription>
        You do not have any active subscriptions yet. Browse plans to get
        started.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button>Browse plans</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const WithoutAction: Story = {
  render: () => (
    <EmptyState className="w-80 rounded-xl border">
      <EmptyStateIcon>
        <PackageOpen aria-hidden="true" />
      </EmptyStateIcon>
      <EmptyStateTitle>No results</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your filters to find what you need.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const Localized: Story = {
  render: () => (
    <EmptyState className="w-96 rounded-xl border">
      <EmptyStateIcon>
        <Inbox aria-hidden="true" />
      </EmptyStateIcon>
      <EmptyStateTitle>Nenhuma assinatura</EmptyStateTitle>
      <EmptyStateDescription>
        Assine um plano para começar.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button>Ver planos</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Skeleton: Story = {
  render: () => <EmptyStateSkeleton />,
};
