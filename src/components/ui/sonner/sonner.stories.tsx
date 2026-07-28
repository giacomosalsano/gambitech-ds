import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";

import { Toaster, toast } from "./sonner";

const meta = {
  title: "Primitives/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => toast("Event has been created")}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Changes saved")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("New update available")}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Check your input")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
      </div>
    </div>
  ),
};
