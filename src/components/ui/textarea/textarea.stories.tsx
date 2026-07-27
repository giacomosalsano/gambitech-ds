import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";

import { Textarea, TextareaSkeleton } from "./textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type your message...",
  },
  render: (args) => (
    <div className="w-72">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Too short",
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
    <div className="flex w-72 flex-col gap-2">
      <TextareaSkeleton />
      <TextareaSkeleton className="h-24" />
    </div>
  ),
};
