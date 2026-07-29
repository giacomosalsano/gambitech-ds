import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  ContextSwitcherContentProps,
  ContextSwitcherItemProps,
  ContextSwitcherItemsProps,
  ContextSwitcherLabelProps,
  ContextSwitcherProps,
  ContextSwitcherSeparatorProps,
  ContextSwitcherSkeletonProps,
  ContextSwitcherTriggerLabelProps,
  ContextSwitcherTriggerProps,
  ContextSwitcherTriggerValueProps,
} from "./context-switcher.types";

interface ContextSwitcherContextValue {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const ContextSwitcherContext =
  React.createContext<ContextSwitcherContextValue | null>(null);

function useContextSwitcher(component: string) {
  const context = React.useContext(ContextSwitcherContext);
  if (!context) {
    throw new Error(`${component} must be used within <ContextSwitcher>.`);
  }
  return context;
}

function ContextSwitcher({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: ContextSwitcherProps) {
  return (
    <ContextSwitcherContext.Provider
      value={{ value, defaultValue, onValueChange }}
    >
      <DropdownMenu data-slot="context-switcher" {...props}>
        {children}
      </DropdownMenu>
    </ContextSwitcherContext.Provider>
  );
}

function ContextSwitcherTrigger({
  className,
  children,
  asChild = false,
  ...props
}: ContextSwitcherTriggerProps) {
  if (asChild) {
    return (
      <DropdownMenuTrigger
        asChild
        data-slot="context-switcher-trigger"
        {...props}
      >
        {children}
      </DropdownMenuTrigger>
    );
  }

  return (
    <DropdownMenuTrigger asChild {...props}>
      <Button
        type="button"
        variant="outline"
        data-slot="context-switcher-trigger"
        className={cn(
          "h-auto max-w-72 justify-between gap-2 px-3 py-2 font-normal",
          className,
        )}
      >
        <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
          {children}
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </Button>
    </DropdownMenuTrigger>
  );
}

function ContextSwitcherTriggerLabel({
  className,
  ...props
}: ContextSwitcherTriggerLabelProps) {
  return (
    <span
      data-slot="context-switcher-trigger-label"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function ContextSwitcherTriggerValue({
  className,
  ...props
}: ContextSwitcherTriggerValueProps) {
  return (
    <span
      data-slot="context-switcher-trigger-value"
      className={cn(
        "w-full truncate text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ContextSwitcherContent({
  className,
  align = "start",
  ...props
}: ContextSwitcherContentProps) {
  return (
    <DropdownMenuContent
      data-slot="context-switcher-content"
      align={align}
      className={cn("min-w-56", className)}
      {...props}
    />
  );
}

function ContextSwitcherLabel({
  className,
  ...props
}: ContextSwitcherLabelProps) {
  return (
    <DropdownMenuLabel
      data-slot="context-switcher-label"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function ContextSwitcherItems({
  className,
  ...props
}: ContextSwitcherItemsProps) {
  const { value, defaultValue, onValueChange } =
    useContextSwitcher("ContextSwitcherItems");

  return (
    <DropdownMenuRadioGroup
      data-slot="context-switcher-items"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
      {...props}
    />
  );
}

function ContextSwitcherItem({
  className,
  children,
  ...props
}: ContextSwitcherItemProps) {
  return (
    <DropdownMenuRadioItem
      data-slot="context-switcher-item"
      className={cn("items-start py-2", className)}
      {...props}
    >
      <span className="flex min-w-0 flex-col gap-0.5">{children}</span>
    </DropdownMenuRadioItem>
  );
}

function ContextSwitcherSeparator({
  className,
  ...props
}: ContextSwitcherSeparatorProps) {
  return (
    <DropdownMenuSeparator
      data-slot="context-switcher-separator"
      className={className}
      {...props}
    />
  );
}

function ContextSwitcherSkeleton({
  className,
  ...props
}: ContextSwitcherSkeletonProps) {
  return (
    <Skeleton
      data-slot="context-switcher-skeleton"
      className={cn("h-12 w-56 rounded-md", className)}
      {...props}
    />
  );
}

export {
  ContextSwitcher,
  ContextSwitcherContent,
  ContextSwitcherItem,
  ContextSwitcherItems,
  ContextSwitcherLabel,
  ContextSwitcherSeparator,
  ContextSwitcherSkeleton,
  ContextSwitcherTrigger,
  ContextSwitcherTriggerLabel,
  ContextSwitcherTriggerValue,
};
export type {
  ContextSwitcherContentProps,
  ContextSwitcherItemProps,
  ContextSwitcherItemsProps,
  ContextSwitcherLabelProps,
  ContextSwitcherProps,
  ContextSwitcherSeparatorProps,
  ContextSwitcherSkeletonProps,
  ContextSwitcherTriggerLabelProps,
  ContextSwitcherTriggerProps,
  ContextSwitcherTriggerValueProps,
} from "./context-switcher.types";
