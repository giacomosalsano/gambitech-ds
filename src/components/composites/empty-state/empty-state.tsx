import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  EmptyStateActionProps,
  EmptyStateDescriptionProps,
  EmptyStateIconProps,
  EmptyStateProps,
  EmptyStateSkeletonProps,
  EmptyStateTitleProps,
} from "./empty-state.types";

function EmptyState({ className, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: EmptyStateIconProps) {
  return (
    <div
      data-slot="empty-state-icon"
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({
  className,
  children,
  ...props
}: EmptyStateTitleProps) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function EmptyStateDescription({
  className,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn("max-w-sm text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function EmptyStateAction({ className, ...props }: EmptyStateActionProps) {
  return (
    <div
      data-slot="empty-state-action"
      className={cn(
        "mt-1 flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateSkeleton({ className, ...props }: EmptyStateSkeletonProps) {
  return (
    <Skeleton
      data-slot="empty-state-skeleton"
      className={cn("h-40 w-72 rounded-xl", className)}
      {...props}
    />
  );
}

export {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSkeleton,
  EmptyStateTitle,
};
export type {
  EmptyStateActionProps,
  EmptyStateDescriptionProps,
  EmptyStateIconProps,
  EmptyStateProps,
  EmptyStateSkeletonProps,
  EmptyStateTitleProps,
} from "./empty-state.types";
