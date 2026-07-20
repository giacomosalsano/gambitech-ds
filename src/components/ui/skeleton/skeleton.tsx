import { cn } from "@/lib/utils";

import type { SkeletonProps } from "./skeleton.types";

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps } from "./skeleton.types";
