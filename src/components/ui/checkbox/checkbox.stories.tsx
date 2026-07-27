import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";

import { Checkbox, CheckboxSkeleton } from "./checkbox";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <CheckboxSkeleton />
      <CheckboxSkeleton />
      <CheckboxSkeleton />
    </div>
  ),
};
