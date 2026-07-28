import type * as React from "react";
import type * as TabsPrimitive from "@radix-ui/react-tabs";
import type { VariantProps } from "class-variance-authority";

import type { SkeletonProps } from "@/components/ui/skeleton";

import type { tabsListVariants } from "./tabs";

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>;

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>;

export type TabsSkeletonProps = SkeletonProps;
