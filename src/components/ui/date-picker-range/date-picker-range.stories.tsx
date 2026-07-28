import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import {
  DatePickerRange,
  DatePickerRangeSkeleton,
} from "./date-picker-range";

const meta = {
  title: "Primitives/DatePickerRange",
  component: DatePickerRange,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    showTodayButton: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DatePickerRange>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = useState<DateRange | null>(null);
    return (
      <DatePickerRange
        value={value}
        onValueChange={(range) => setValue(range ?? null)}
      />
    );
  },
};

export const WithValue: Story = {
  render: function WithValueStory() {
    const [value, setValue] = useState<DateRange | null>({
      from: new Date(2026, 6, 10),
      to: new Date(2026, 6, 18),
    });
    return (
      <DatePickerRange
        value={value}
        onValueChange={(range) => setValue(range ?? null)}
      />
    );
  },
};

export const WithTodayButton: Story = {
  render: function WithTodayButtonStory() {
    const [value, setValue] = useState<DateRange | null>({
      from: new Date(2024, 0, 10),
      to: new Date(2024, 0, 18),
    });
    return (
      <DatePickerRange
        value={value}
        onValueChange={(range) => setValue(range ?? null)}
        showTodayButton
      />
    );
  },
};

export const LocalizedPtBR: Story = {
  render: function LocalizedPtBRStory() {
    const [value, setValue] = useState<DateRange | null>(null);
    return (
      <DatePickerRange
        value={value}
        onValueChange={(range) => setValue(range ?? null)}
        placeholder="Escolha um período"
        locale={ptBR}
        showTodayButton
        todayButtonLabel="Hoje"
        formatString="PPP"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Unavailable",
  },
};

export const Skeletons: Story = {
  render: () => <DatePickerRangeSkeleton />,
};
