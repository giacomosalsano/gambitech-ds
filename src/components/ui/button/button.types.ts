import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { AsChildProps } from "@/lib/types";
import type { SkeletonProps } from "@/components/ui/skeleton";

import type { buttonSkeletonVariants, buttonVariants } from "./button";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants>,
    AsChildProps {
  /**
   * Keeps the control visually active but announces `aria-busy`, shows a
   * spinner (non-`asChild`), and suppresses clicks to prevent duplicate
   * submissions. Use `disabled` for the inert, greyed-out state.
   */
  isLoading?: boolean;
}

export interface ButtonSkeletonProps
  extends SkeletonProps,
    VariantProps<typeof buttonSkeletonVariants> {}
