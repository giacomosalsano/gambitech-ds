import type * as React from "react";

import type { AsChildProps } from "@/lib/types";
import type { SkeletonProps } from "@/components/ui/skeleton";

export type BreadcrumbProps = React.ComponentProps<"nav">;

export type BreadcrumbListProps = React.ComponentProps<"ol">;

export type BreadcrumbItemProps = React.ComponentProps<"li">;

export type BreadcrumbLinkProps = React.ComponentProps<"a"> & AsChildProps;

export type BreadcrumbPageProps = React.ComponentProps<"span">;

export type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

export type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

export type BreadcrumbSkeletonProps = SkeletonProps;
