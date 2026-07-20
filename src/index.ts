/**
 * Public entry point for @gambitech/ds.
 *
 * Primitives are added here as they are implemented (see docs/ai/EPICS.md),
 * using explicit named exports only.
 */

export { cn } from "./lib/utils";

export { Badge, badgeVariants } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";
export { Button, ButtonSkeleton, buttonVariants } from "./components/ui/button";
export type { ButtonProps, ButtonSkeletonProps } from "./components/ui/button";
export { Skeleton } from "./components/ui/skeleton";
