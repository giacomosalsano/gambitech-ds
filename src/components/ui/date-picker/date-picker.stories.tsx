import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ptBR } from "date-fns/locale";

import { DatePicker, DatePickerSkeleton } from "./date-picker";

const meta = {
  title: "Primitives/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    showTodayButton: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        value={value}
        onValueChange={(date) => setValue(date ?? null)}
      />
    );
  },
};

export const WithValue: Story = {
  render: function WithValueStory() {
    const [value, setValue] = useState<Date | null>(new Date(2026, 6, 15));
    return (
      <DatePicker
        value={value}
        onValueChange={(date) => setValue(date ?? null)}
      />
    );
  },
};

export const WithTodayButton: Story = {
  render: function WithTodayButtonStory() {
    const [value, setValue] = useState<Date | null>(new Date(2024, 0, 10));
    return (
      <DatePicker
        value={value}
        onValueChange={(date) => setValue(date ?? null)}
        showTodayButton
        todayButtonLabel="Today"
      />
    );
  },
};

export const LocalizedPtBR: Story = {
  render: function LocalizedPtBRStory() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        value={value}
        onValueChange={(date) => setValue(date ?? null)}
        placeholder="Escolha uma data"
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
  render: () => <DatePickerSkeleton />,
};
