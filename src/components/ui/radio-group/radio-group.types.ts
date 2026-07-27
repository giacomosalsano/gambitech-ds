import type * as React from "react";
import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import type { SkeletonProps } from "@/components/ui/skeleton";

export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>;

export type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>;

export type RadioGroupItemSkeletonProps = SkeletonProps;
