import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
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
} from "./table";

const getTable = () => screen.getByRole("table");
const getTableSkeleton = () => screen.getByTestId("table-skeleton");

function renderSampleTable() {
  return render(
    <Table>
      <TableCaption>A list of invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>INV-002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>$400.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );
}

describe("Table", () => {
  it("renders the compound parts with the expected data-slots", () => {
    renderSampleTable();

    expect(getTable()).toHaveAttribute("data-slot", "table");
    expect(
      document.querySelector("[data-slot='table-container']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='table-header']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='table-body']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='table-footer']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='table-caption']"),
    ).toBeInTheDocument();
  });

  it("exposes column headers and cell content for screen readers", () => {
    renderSampleTable();

    expect(
      screen.getByRole("columnheader", { name: "Invoice" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "INV-001" })).toBeInTheDocument();
    expect(screen.getByText("A list of invoices.")).toBeInTheDocument();
  });

  it("applies the selected row token", () => {
    renderSampleTable();

    const selectedRow = screen.getByText("INV-002").closest("tr");
    expect(selectedRow).toHaveAttribute("data-state", "selected");
    expect(selectedRow).toHaveClass("data-[state=selected]:bg-muted");
  });

  it("keeps checkbox alignment helpers on head and cell", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const head = screen.getByRole("columnheader", { name: "Select" });
    const cell = screen.getByRole("cell", { name: "Row" });

    expect(head).toHaveClass("[&:has([role=checkbox])]:pr-0");
    expect(cell).toHaveClass("[&:has([role=checkbox])]:pr-0");
    expect(within(getTable()).getAllByRole("row")).toHaveLength(2);
  });
});

describe("TableHead sorting", () => {
  it("renders a sort trigger with aria-sort when isSortable is set", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead isSortable sortDirection="asc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByRole("columnheader", { name: "Name" });
    expect(head).toHaveAttribute("data-sortable");
    expect(head).toHaveAttribute("data-sort-direction", "asc");
    expect(head).toHaveAttribute("aria-sort", "ascending");
    expect(
      within(head).getByRole("button", { name: "Name" }),
    ).toHaveAttribute("data-slot", "table-sort-trigger");
  });

  it("calls onSort when the sort trigger is clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead isSortable sortDirection="none" onSort={onSort}>
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    await user.click(screen.getByRole("button", { name: "Amount" }));
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it("exposes descending state via aria-sort and data attributes", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead isSortable sortDirection="desc">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByRole("columnheader", { name: "Status" });
    expect(head).toHaveAttribute("aria-sort", "descending");
    expect(head).toHaveAttribute("data-sort-direction", "desc");
  });
});

describe("getNextTableSortDirection", () => {
  it("cycles none → asc → desc → none", () => {
    expect(getNextTableSortDirection("none")).toBe("asc");
    expect(getNextTableSortDirection("asc")).toBe("desc");
    expect(getNextTableSortDirection("desc")).toBe("none");
  });
});

describe("TableSkeleton", () => {
  it("renders a skeleton placeholder matching a compact table footprint", () => {
    render(<TableSkeleton data-testid="table-skeleton" />);

    expect(getTableSkeleton()).toHaveAttribute("data-slot", "table-skeleton");
    expect(getTableSkeleton()).toHaveClass("h-40");
    expect(getTableSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding dimensions via className", () => {
    render(<TableSkeleton data-testid="table-skeleton" className="h-64" />);

    expect(getTableSkeleton()).toHaveClass("h-64");
  });
});
