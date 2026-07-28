import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSkeletonProps,
  TableSortDirection,
} from "./table.types";

/**
 * Cycles `none → asc → desc → none` for controlled sortable headers.
 */
function getNextTableSortDirection(
  current: TableSortDirection,
): TableSortDirection {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

function tableSortAriaValue(
  direction: TableSortDirection,
): "ascending" | "descending" | "none" {
  if (direction === "asc") return "ascending";
  if (direction === "desc") return "descending";
  return "none";
}

function Table({ className, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  children,
  isSortable = false,
  sortDirection = "none",
  onSort,
  ...props
}: TableHeadProps) {
  if (!isSortable) {
    return (
      <th
        data-slot="table-head"
        className={cn(
          "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          className,
        )}
        {...props}
      >
        {children}
      </th>
    );
  }

  const SortIcon =
    sortDirection === "asc"
      ? ArrowUp
      : sortDirection === "desc"
        ? ArrowDown
        : ArrowUpDown;

  return (
    <th
      data-slot="table-head"
      data-sortable=""
      data-sort-direction={sortDirection}
      aria-sort={tableSortAriaValue(sortDirection)}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        data-slot="table-sort-trigger"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm outline-none",
          "hover:text-foreground/80",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        )}
        onClick={onSort}
      >
        {children}
        <SortIcon
          data-slot="table-sort-icon"
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground"
        />
      </button>
    </th>
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function TableSkeleton({ className, ...props }: TableSkeletonProps) {
  return (
    <Skeleton
      data-slot="table-skeleton"
      className={cn("h-40 w-full rounded-md", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  getNextTableSortDirection,
};
export type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableSkeletonProps,
  TableSortDirection,
} from "./table.types";
