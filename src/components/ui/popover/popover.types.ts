import type * as React from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

export type PopoverAnchorProps = React.ComponentProps<
  typeof PopoverPrimitive.Anchor
>;

export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
