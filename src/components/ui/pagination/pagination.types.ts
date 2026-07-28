import type * as React from "react";

import type { ButtonProps } from "@/components/ui/button";

export type PaginationProps = React.ComponentProps<"nav">;

export type PaginationContentProps = React.ComponentProps<"ul">;

export type PaginationItemProps = React.ComponentProps<"li">;

export type PaginationLinkProps = {
  /**
   * Marks the link as the current page (`aria-current="page"`).
   */
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

export type PaginationPreviousProps = PaginationLinkProps;

export type PaginationNextProps = PaginationLinkProps;

export type PaginationEllipsisProps = React.ComponentProps<"span">;
