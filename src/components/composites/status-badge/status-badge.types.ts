import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { BadgeProps } from "@/components/ui/badge";
import type { badgeVariants } from "@/components/ui/badge";
import type { SkeletonProps } from "@/components/ui/skeleton";

export type StatusBadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>;

/**
 * Consumer-owned mapping from a status key to display label and badge variant.
 * Domain labels (appointment, subscription, …) stay outside the library
 * (ADR-0002).
 */
export type StatusBadgeConfig = {
  label: React.ReactNode;
  variant?: StatusBadgeVariant;
};

export interface StatusBadgeProps
  extends Omit<BadgeProps, "children" | "variant"> {
  /**
   * Current status key looked up in `statuses`.
   */
  status: string;
  /**
   * Typed map of status → label/variant. Unknown keys fall back to `outline`
   * with the raw `status` string as the label.
   */
  statuses: Record<string, StatusBadgeConfig>;
}

export type StatusBadgeSkeletonProps = SkeletonProps;
