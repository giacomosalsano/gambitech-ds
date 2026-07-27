import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";

import { Input, InputSkeleton } from "./input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type here...",
  },
  render: (args) => (
    <div className="w-64">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Quantity" />
      <Input type="file" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "not-an-email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Unavailable",
  },
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <InputSkeleton />
      <InputSkeleton className="w-40" />
    </div>
  ),
};
