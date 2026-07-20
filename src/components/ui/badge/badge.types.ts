import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { AsChildProps } from "@/lib/types";
import type { SkeletonProps } from "@/components/ui/skeleton";

import type { badgeVariants } from "./badge";

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants>,
    AsChildProps {}

export type BadgeSkeletonProps = SkeletonProps;
