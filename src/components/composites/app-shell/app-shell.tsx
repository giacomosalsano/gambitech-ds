import * as React from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

import type {
  AppShellContentProps,
  AppShellHeaderProps,
  AppShellMainProps,
  AppShellMobileTriggerProps,
  AppShellProps,
  AppShellSidebarProps,
  AppShellSkeletonProps,
} from "./app-shell.types";

interface AppShellContextValue {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  mobileNavTitle: string;
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null);

function useAppShellContext(component: string) {
  const context = React.useContext(AppShellContext);
  if (!context) {
    throw new Error(`${component} must be used within <AppShell>.`);
  }
  return context;
}

function AppShell({
  className,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  mobileNavTitle = "Navigation",
  ...props
}: AppShellProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = open !== undefined;
  const isMobileNavOpen = isControlled ? open : uncontrolledOpen;

  function setIsMobileNavOpen(next: boolean) {
    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  }

  return (
    <AppShellContext.Provider
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        mobileNavTitle,
      }}
    >
      <div
        data-slot="app-shell"
        className={cn("flex min-h-svh w-full bg-background", className)}
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  );
}

function AppShellSidebar({
  className,
  children,
  side = "left",
  ...props
}: AppShellSidebarProps) {
  const { isMobileNavOpen, setIsMobileNavOpen, mobileNavTitle } =
    useAppShellContext("AppShellSidebar");

  return (
    <>
      <aside
        data-slot="app-shell-sidebar"
        data-side={side}
        className={cn(
          "hidden w-64 shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground md:flex",
          side === "left" ? "border-r" : "order-last border-l",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent
          side={side}
          showCloseButton
          className={cn(
            "w-72 gap-0 bg-sidebar p-0 text-sidebar-foreground md:hidden",
            className,
          )}
        >
          <SheetTitle className="sr-only">{mobileNavTitle}</SheetTitle>
          <div
            data-slot="app-shell-sidebar-mobile"
            className="flex h-full flex-col"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function AppShellMain({ className, ...props }: AppShellMainProps) {
  return (
    <div
      data-slot="app-shell-main"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function AppShellHeader({ className, ...props }: AppShellHeaderProps) {
  return (
    <header
      data-slot="app-shell-header"
      className={cn(
        "sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4",
        className,
      )}
      {...props}
    />
  );
}

function AppShellContent({ className, ...props }: AppShellContentProps) {
  return (
    <main
      data-slot="app-shell-content"
      className={cn("flex flex-1 flex-col", className)}
      {...props}
    />
  );
}

function AppShellMobileTrigger({
  className,
  children,
  "aria-label": ariaLabel = "Open navigation",
  onClick,
  ...props
}: AppShellMobileTriggerProps) {
  const { setIsMobileNavOpen } = useAppShellContext("AppShellMobileTrigger");

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      data-slot="app-shell-mobile-trigger"
      aria-label={ariaLabel}
      className={cn("md:hidden", className)}
      onClick={(event) => {
        setIsMobileNavOpen(true);
        onClick?.(event);
      }}
      {...props}
    >
      {children ?? <Menu aria-hidden="true" />}
    </Button>
  );
}

function AppShellSkeleton({ className, ...props }: AppShellSkeletonProps) {
  return (
    <Skeleton
      data-slot="app-shell-skeleton"
      className={cn("min-h-svh w-full rounded-none", className)}
      {...props}
    />
  );
}

export {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellMobileTrigger,
  AppShellSidebar,
  AppShellSkeleton,
};
export type {
  AppShellContentProps,
  AppShellHeaderProps,
  AppShellMainProps,
  AppShellMobileTriggerProps,
  AppShellProps,
  AppShellSidebarProps,
  AppShellSidebarSide,
  AppShellSkeletonProps,
} from "./app-shell.types";
