import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { SkeletonProps } from "@/components/ui/skeleton";

import type { alertVariants } from "./alert";

export interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {}

export type AlertTitleProps = React.ComponentProps<"div">;

export type AlertDescriptionProps = React.ComponentProps<"div">;

export type AlertSkeletonProps = SkeletonProps;
