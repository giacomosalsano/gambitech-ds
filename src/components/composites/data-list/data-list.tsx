import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  DataListProps,
  DataListSkeletonProps,
  EntityRowActionsProps,
  EntityRowContentProps,
  EntityRowMetaProps,
  EntityRowProps,
  EntityRowSkeletonProps,
  EntityRowTitleProps,
  EntityRowValueProps,
} from "./data-list.types";

function DataList({ className, ...props }: DataListProps) {
  return (
    <ul
      data-slot="data-list"
      className={cn(
        "flex flex-col divide-y divide-border overflow-hidden rounded-xl border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

function EntityRow({ className, ...props }: EntityRowProps) {
  return (
    <li
      data-slot="entity-row"
      className={cn(
        "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4",
        className,
      )}
      {...props}
    />
  );
}

function EntityRowContent({ className, ...props }: EntityRowContentProps) {
  return (
    <div
      data-slot="entity-row-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

function EntityRowTitle({
  className,
  children,
  ...props
}: EntityRowTitleProps) {
  return (
    <div
      data-slot="entity-row-title"
      className={cn("font-medium leading-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function EntityRowMeta({ className, ...props }: EntityRowMetaProps) {
  return (
    <div
      data-slot="entity-row-meta"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function EntityRowValue({ className, ...props }: EntityRowValueProps) {
  return (
    <div
      data-slot="entity-row-value"
      className={cn(
        "shrink-0 text-sm font-medium tabular-nums sm:text-right",
        className,
      )}
      {...props}
    />
  );
}

function EntityRowActions({ className, ...props }: EntityRowActionsProps) {
  return (
    <div
      data-slot="entity-row-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function EntityRowSkeleton({ className, ...props }: EntityRowSkeletonProps) {
  return (
    <Skeleton
      data-slot="entity-row-skeleton"
      className={cn("h-16 w-full rounded-none", className)}
      {...props}
    />
  );
}

function DataListSkeleton({ className, ...props }: DataListSkeletonProps) {
  return (
    <Skeleton
      data-slot="data-list-skeleton"
      className={cn("h-48 w-full rounded-xl", className)}
      {...props}
    />
  );
}

export {
  DataList,
  DataListSkeleton,
  EntityRow,
  EntityRowActions,
  EntityRowContent,
  EntityRowMeta,
  EntityRowSkeleton,
  EntityRowTitle,
  EntityRowValue,
};
export type {
  DataListProps,
  DataListSkeletonProps,
  EntityRowActionsProps,
  EntityRowContentProps,
  EntityRowMetaProps,
  EntityRowProps,
  EntityRowSkeletonProps,
  EntityRowTitleProps,
  EntityRowValueProps,
} from "./data-list.types";
