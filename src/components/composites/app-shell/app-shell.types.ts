import type * as React from "react";

import type { SkeletonProps } from "@/components/ui/skeleton";
import type { ButtonProps } from "@/components/ui/button";

export type AppShellSidebarSide = "left" | "right";

export interface AppShellProps extends React.ComponentProps<"div"> {
  /**
   * Controlled open state for the mobile navigation drawer.
   */
  open?: boolean;
  /**
   * Uncontrolled initial open state for the mobile navigation drawer.
   */
  defaultOpen?: boolean;
  /**
   * Called when the mobile navigation drawer open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Accessible title for the mobile navigation drawer (`SheetTitle`).
   * Override for i18n. Defaults to `"Navigation"`.
   */
  mobileNavTitle?: string;
}

export interface AppShellSidebarProps extends React.ComponentProps<"aside"> {
  /**
   * Desktop sidebar edge and matching mobile drawer side. Defaults to `"left"`.
   */
  side?: AppShellSidebarSide;
}

export type AppShellMainProps = React.ComponentProps<"div">;

export type AppShellHeaderProps = React.ComponentProps<"header">;

export type AppShellContentProps = React.ComponentProps<"main">;

export type AppShellMobileTriggerProps = Omit<ButtonProps, "children"> & {
  /**
   * Accessible name for the trigger. Override for i18n.
   * Defaults to `"Open navigation"`.
   */
  "aria-label"?: string;
  /**
   * Optional icon/content. Defaults to a Menu icon.
   */
  children?: React.ReactNode;
};

export type AppShellSkeletonProps = SkeletonProps;
