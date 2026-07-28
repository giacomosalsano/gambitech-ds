import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
  type TableSortDirection,
} from "./table";

const meta = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV-001",
    status: "Paid",
    method: "Credit Card",
    amount: 250,
  },
  {
    invoice: "INV-002",
    status: "Pending",
    method: "PayPal",
    amount: 150,
  },
  {
    invoice: "INV-003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: 350,
  },
];

type Invoice = (typeof invoices)[number];
type SortKey = keyof Invoice;

function compareInvoiceValues(
  a: Invoice[SortKey],
  b: Invoice[SortKey],
  direction: Exclude<TableSortDirection, "none">,
) {
  const order = direction === "asc" ? 1 : -1;

  if (typeof a === "number" && typeof b === "number") {
    return (a - b) * order;
  }

  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  }) * order;
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">
              ${invoice.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const SortableColumns: Story = {
  render: function SortableColumnsStory() {
    const [rows, setRows] = useState(invoices);
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] =
      useState<TableSortDirection>("none");

    const handleSort = (key: SortKey) => {
      const nextDirection =
        sortKey === key
          ? getNextTableSortDirection(sortDirection)
          : "asc";

      setSortKey(nextDirection === "none" ? null : key);
      setSortDirection(nextDirection);

      if (nextDirection === "none") {
        setRows(invoices);
        return;
      }

      setRows(
        [...invoices].sort((a, b) =>
          compareInvoiceValues(a[key], b[key], nextDirection),
        ),
      );
    };

    const directionFor = (key: SortKey): TableSortDirection =>
      sortKey === key ? sortDirection : "none";

    return (
      <Table>
        <TableCaption>
          Click a column header to sort (asc → desc → none). Alphabetical and
          numeric comparators are applied by the consumer.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              isSortable
              sortDirection={directionFor("invoice")}
              onSort={() => handleSort("invoice")}
            >
              Invoice
            </TableHead>
            <TableHead
              isSortable
              sortDirection={directionFor("status")}
              onSort={() => handleSort("status")}
            >
              Status
            </TableHead>
            <TableHead
              isSortable
              sortDirection={directionFor("method")}
              onSort={() => handleSort("method")}
            >
              Method
            </TableHead>
            <TableHead
              isSortable
              sortDirection={directionFor("amount")}
              onSort={() => handleSort("amount")}
              className="text-right"
            >
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">
                ${invoice.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const SelectedRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>Grace Hopper</TableCell>
          <TableCell>Admiral</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <TableSkeleton />
      <TableSkeleton className="h-56" />
    </div>
  ),
};
