/**
 * Public entry point for @gambitech/ds.
 *
 * Primitives are added here as they are implemented (see docs/ai/EPICS.md),
 * using explicit named exports only.
 */

export { cn } from "./lib/utils";

export { Badge, BadgeSkeleton, badgeVariants } from "./components/ui/badge";
export type { BadgeProps, BadgeSkeletonProps } from "./components/ui/badge";
export { Button, ButtonSkeleton, buttonVariants } from "./components/ui/button";
export type { ButtonProps, ButtonSkeletonProps } from "./components/ui/button";
export { Skeleton } from "./components/ui/skeleton";
export type { SkeletonProps } from "./components/ui/skeleton";
