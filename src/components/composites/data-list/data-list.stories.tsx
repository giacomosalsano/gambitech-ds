import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/composites/status-badge";

import {
  DataList,
  DataListSkeleton,
  EntityRow,
  EntityRowActions,
  EntityRowContent,
  EntityRowMeta,
  EntityRowSkeleton,
  EntityRowTitle,
  EntityRowValue,
} from "./data-list";

const meta = {
  title: "Composites/DataList",
  component: DataList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DataList>;

export default meta;

type Story = StoryObj<typeof meta>;

const planStatuses = {
  active: { label: "Active", variant: "success" as const },
  inactive: { label: "Inactive", variant: "secondary" as const },
};

export const Default: Story = {
  render: () => (
    <DataList className="w-[28rem]" aria-label="Plans">
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Starter</EntityRowTitle>
          <EntityRowMeta>3 services · monthly</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 99,00</EntityRowValue>
        <EntityRowActions>
          <StatusBadge status="active" statuses={planStatuses} />
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </EntityRowActions>
      </EntityRow>
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Pro</EntityRowTitle>
          <EntityRowMeta>Unlimited · monthly</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 199,00</EntityRowValue>
        <EntityRowActions>
          <StatusBadge status="active" statuses={planStatuses} />
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </EntityRowActions>
      </EntityRow>
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Legacy</EntityRowTitle>
          <EntityRowMeta>Archived plan</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 49,00</EntityRowValue>
        <EntityRowActions>
          <StatusBadge status="inactive" statuses={planStatuses} />
          <Button variant="destructive" size="sm">
            Remove
          </Button>
        </EntityRowActions>
      </EntityRow>
    </DataList>
  ),
};

export const Localized: Story = {
  render: () => (
    <DataList className="w-[28rem]" aria-label="Planos">
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Básico</EntityRowTitle>
          <EntityRowMeta>3 serviços · mensal</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 99,00</EntityRowValue>
        <EntityRowActions>
          <Button size="sm">Editar</Button>
        </EntityRowActions>
      </EntityRow>
    </DataList>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex w-[28rem] flex-col gap-4">
      <DataListSkeleton />
      <div className="overflow-hidden rounded-xl border">
        <EntityRowSkeleton />
        <EntityRowSkeleton />
      </div>
    </div>
  ),
};
