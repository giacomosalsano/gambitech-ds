import type * as React from "react";

import type { AsChildProps } from "@/lib/types";
import type { SkeletonProps } from "@/components/ui/skeleton";
import type {
  DropdownMenuContentProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuTriggerProps,
} from "@/components/ui/dropdown-menu";

export interface ContextSwitcherProps extends DropdownMenuProps {
  /**
   * Controlled selected membership / context id.
   */
  value?: string;
  /**
   * Uncontrolled initial selected membership / context id.
   */
  defaultValue?: string;
  /**
   * Called when the selected context changes.
   */
  onValueChange?: (value: string) => void;
}

export type ContextSwitcherTriggerProps = Omit<
  DropdownMenuTriggerProps,
  "asChild"
> &
  AsChildProps & {
    className?: string;
  };

export type ContextSwitcherTriggerLabelProps = React.ComponentProps<"span">;

export type ContextSwitcherTriggerValueProps = React.ComponentProps<"span">;

export type ContextSwitcherContentProps = DropdownMenuContentProps;

export type ContextSwitcherLabelProps = DropdownMenuLabelProps;

export type ContextSwitcherItemsProps = Omit<
  DropdownMenuRadioGroupProps,
  "value" | "defaultValue" | "onValueChange"
>;

export type ContextSwitcherItemProps = DropdownMenuRadioItemProps;

export type ContextSwitcherSeparatorProps = DropdownMenuSeparatorProps;

export type ContextSwitcherSkeletonProps = SkeletonProps;
