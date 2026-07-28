import type * as React from "react";

import type { SkeletonProps } from "@/components/ui/skeleton";

export type TableProps = React.ComponentProps<"table">;

export type TableHeaderProps = React.ComponentProps<"thead">;

export type TableBodyProps = React.ComponentProps<"tbody">;

export type TableFooterProps = React.ComponentProps<"tfoot">;

export type TableRowProps = React.ComponentProps<"tr">;

/**
 * Column sort state. `asc` / `desc` cover numeric and alphabetical ordering;
 * the consumer chooses the comparator when sorting row data.
 */
export type TableSortDirection = "asc" | "desc" | "none";

export interface TableHeadProps extends React.ComponentProps<"th"> {
  /**
   * When `true`, renders a sort control and wires `aria-sort` /
   * `data-sort-direction`. Sorting of row data remains the consumer's job.
   */
  isSortable?: boolean;
  /**
   * Current sort direction for this column. Defaults to `"none"`.
   */
  sortDirection?: TableSortDirection;
  /**
   * Called when the sort control is activated. Consumers typically cycle
   * direction and re-order their row data.
   */
  onSort?: () => void;
}

export type TableCellProps = React.ComponentProps<"td">;

export type TableCaptionProps = React.ComponentProps<"caption">;

export type TableSkeletonProps = SkeletonProps;
