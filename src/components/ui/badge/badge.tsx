import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type { BadgeProps, BadgeSkeletonProps } from "./badge.types";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
        info: "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// Height and radius match the badge's footprint (text-xs + py-0.5 + border);
// width is a sensible default that consumers can override via `className`.
function BadgeSkeleton({ className, ...props }: BadgeSkeletonProps) {
  return (
    <Skeleton
      data-slot="badge-skeleton"
      className={cn("h-5 w-16 rounded-md", className)}
      {...props}
    />
  );
}

export { Badge, BadgeSkeleton, badgeVariants };
export type { BadgeProps, BadgeSkeletonProps } from "./badge.types";
