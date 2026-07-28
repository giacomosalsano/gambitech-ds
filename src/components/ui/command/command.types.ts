import type * as React from "react";
import type { Command as CommandPrimitive } from "cmdk";

import type { DialogProps } from "@/components/ui/dialog";
import type { SkeletonProps } from "@/components/ui/skeleton";

export type CommandProps = React.ComponentProps<typeof CommandPrimitive>;

export interface CommandDialogProps extends DialogProps {
  children?: React.ReactNode;
  /**
   * Visually hidden dialog title (sr-only). Defaults to `"Command Palette"`.
   * Override for i18n.
   */
  title?: string;
  /**
   * Visually hidden dialog description (sr-only). Defaults to
   * `"Search for a command to run..."`. Override for i18n.
   */
  description?: string;
  /**
   * Extra classes applied to `DialogContent`.
   */
  className?: string;
  /**
   * Forwards to `DialogContent.showCloseButton`. Defaults to `true`.
   */
  showCloseButton?: boolean;
}

export type CommandInputProps = React.ComponentProps<
  typeof CommandPrimitive.Input
>;

export type CommandListProps = React.ComponentProps<
  typeof CommandPrimitive.List
>;

export type CommandEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
>;

export type CommandGroupProps = React.ComponentProps<
  typeof CommandPrimitive.Group
>;

export type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>;

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
>;

export type CommandShortcutProps = React.ComponentProps<"span">;

export type CommandSkeletonProps = SkeletonProps;
