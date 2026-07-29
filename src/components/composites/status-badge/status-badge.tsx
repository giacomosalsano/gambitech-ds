import { cn } from "@/lib/utils";
import { Badge, BadgeSkeleton } from "@/components/ui/badge";

import type {
  StatusBadgeProps,
  StatusBadgeSkeletonProps,
} from "./status-badge.types";

function StatusBadge({
  status,
  statuses,
  className,
  ...props
}: StatusBadgeProps) {
  const config = statuses[status];
  const label = config?.label ?? status;
  const variant = config?.variant ?? "outline";

  return (
    <Badge
      data-slot="status-badge"
      data-status={status}
      variant={variant}
      className={cn(className)}
      {...props}
    >
      {label}
    </Badge>
  );
}

function StatusBadgeSkeleton({
  className,
  ...props
}: StatusBadgeSkeletonProps) {
  return (
    <BadgeSkeleton
      data-slot="status-badge-skeleton"
      className={cn(className)}
      {...props}
    />
  );
}

export { StatusBadge, StatusBadgeSkeleton };
export type {
  StatusBadgeConfig,
  StatusBadgeProps,
  StatusBadgeSkeletonProps,
  StatusBadgeVariant,
} from "./status-badge.types";
