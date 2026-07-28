import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getNav = () => screen.getByRole("navigation", { name: "Pagination" });

function renderSamplePagination(activePage = 2) {
  return render(
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive={activePage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive={activePage === 2}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  );
}

describe("Pagination", () => {
  it("renders a labeled navigation landmark with compound parts", () => {
    renderSamplePagination();

    expect(getNav()).toHaveAttribute("data-slot", "pagination");
    expect(
      document.querySelector("[data-slot='pagination-content']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-item']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-ellipsis']"),
    ).toBeInTheDocument();
  });

  it("marks the active page with aria-current", () => {
    renderSamplePagination(2);

    const page2 = within(getNav()).getByRole("link", { name: "2" });
    expect(page2).toHaveAttribute("aria-current", "page");
    expect(page2).toHaveAttribute("data-active", "true");
    expect(page2).toHaveClass("border"); // outline variant when active

    const page1 = within(getNav()).getByRole("link", { name: "1" });
    expect(page1).not.toHaveAttribute("aria-current");
  });

  it("exposes previous and next controls with accessible names", () => {
    renderSamplePagination();

    expect(
      within(getNav()).getByRole("link", { name: "Go to previous page" }),
    ).toBeInTheDocument();
    expect(
      within(getNav()).getByRole("link", { name: "Go to next page" }),
    ).toBeInTheDocument();
  });

  it("allows overriding Previous/Next children and labels for i18n", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" aria-label="Página anterior">
              Anterior
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" aria-label="Próxima página">
              Próximo
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(
      screen.getByRole("link", { name: "Página anterior" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Próxima página" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });
});
