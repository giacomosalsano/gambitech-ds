import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsSkeleton,
  TabsTrigger,
} from "./tabs";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
    defaultValue: "account",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs className="w-80" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-md border p-4 text-sm">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="rounded-md border p-4 text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Tabs className="w-80" {...args}>
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-2 text-sm text-muted-foreground">
        Account settings.
      </TabsContent>
      <TabsContent
        value="password"
        className="pt-2 text-sm text-muted-foreground"
      >
        Password settings.
      </TabsContent>
      <TabsContent value="team" className="pt-2 text-sm text-muted-foreground">
        Team settings.
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Tabs className="w-96" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-md border p-4 text-sm">
        Account panel.
      </TabsContent>
      <TabsContent value="password" className="rounded-md border p-4 text-sm">
        Password panel.
      </TabsContent>
      <TabsContent
        value="notifications"
        className="rounded-md border p-4 text-sm"
      >
        Notifications panel.
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Tabs className="w-80" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-md border p-4 text-sm">
        Only the account tab is available.
      </TabsContent>
    </Tabs>
  ),
};

export const Skeleton: Story = {
  render: () => <TabsSkeleton />,
};
