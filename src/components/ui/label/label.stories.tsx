import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/components/ui/input";

import { Label } from "./label";

const meta = {
  title: "Primitives/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Email",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="group flex w-64 flex-col gap-2" data-disabled="true">
      <Label htmlFor="disabled-input">Disabled field</Label>
      <Input id="disabled-input" placeholder="Unavailable" disabled />
    </div>
  ),
};
