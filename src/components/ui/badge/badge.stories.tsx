import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2 } from "lucide-react";

import { Badge, BadgeSkeleton } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
      ],
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Badge variant="success">
      <CheckCircle2 />
      Active
    </Badge>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <BadgeSkeleton />
      <BadgeSkeleton className="w-24" />
    </div>
  ),
};
