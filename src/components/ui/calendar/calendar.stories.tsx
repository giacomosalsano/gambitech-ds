import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";

import { Calendar, CalendarSkeleton } from "./calendar";

const meta = {
  title: "Primitives/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [selected, setSelected] = useState<Date | undefined>(
      new Date(2026, 6, 15),
    );

    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={selected}
      />
    );
  },
};

export const Range: Story = {
  render: function RangeStory() {
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: new Date(2026, 6, 10),
      to: new Date(2026, 6, 18),
    });

    return (
      <Calendar
        mode="range"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={selected?.from}
        numberOfMonths={2}
      />
    );
  },
};

export const DropdownCaption: Story = {
  render: function DropdownCaptionStory() {
    const [selected, setSelected] = useState<Date | undefined>();

    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
        defaultMonth={new Date(2026, 6, 1)}
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
  },
};

export const Skeletons: Story = {
  render: () => <CalendarSkeleton />,
};
