import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  MetricCardEmptyProps,
  MetricCardLabelProps,
  MetricCardProps,
  MetricCardSkeletonProps,
  MetricCardValueProps,
} from "./metric-card.types";

function MetricCard({ className, ...props }: MetricCardProps) {
  return (
    <div
      data-slot="metric-card"
      className={cn(
        "flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function MetricCardLabel({ className, ...props }: MetricCardLabelProps) {
  return (
    <div
      data-slot="metric-card-label"
      className={cn("text-sm font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

function MetricCardValue({ className, ...props }: MetricCardValueProps) {
  return (
    <div
      data-slot="metric-card-value"
      className={cn(
        "text-2xl font-semibold tracking-tight tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

function MetricCardEmpty({ className, ...props }: MetricCardEmptyProps) {
  return (
    <div
      data-slot="metric-card-empty"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function MetricCardSkeleton({ className, ...props }: MetricCardSkeletonProps) {
  return (
    <Skeleton
      data-slot="metric-card-skeleton"
      className={cn("h-24 w-48 rounded-xl", className)}
      {...props}
    />
  );
}

export {
  MetricCard,
  MetricCardEmpty,
  MetricCardLabel,
  MetricCardSkeleton,
  MetricCardValue,
};
export type {
  MetricCardEmptyProps,
  MetricCardLabelProps,
  MetricCardProps,
  MetricCardSkeletonProps,
  MetricCardValueProps,
} from "./metric-card.types";
