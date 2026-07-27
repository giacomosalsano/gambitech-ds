import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemSkeleton,
} from "./radio-group";

const meta = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="card" orientation="horizontal">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="card" id="h1" />
        <Label htmlFor="h1">Card</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pix" id="h2" />
        <Label htmlFor="h2">Pix</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="boleto" id="h3" />
        <Label htmlFor="h3">Boleto</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="one" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="d1" />
        <Label htmlFor="d1">Option one</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="d2" />
        <Label htmlFor="d2">Option two</Label>
      </div>
    </RadioGroup>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <RadioGroupItemSkeleton />
      <RadioGroupItemSkeleton />
      <RadioGroupItemSkeleton />
    </div>
  ),
};
