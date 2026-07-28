import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbSkeleton,
} from "./breadcrumb";

function renderSampleBreadcrumb() {
  return render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  );
}

describe("Breadcrumb", () => {
  it("renders a labeled navigation landmark with compound parts", () => {
    renderSampleBreadcrumb();

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveAttribute("data-slot", "breadcrumb");
    expect(
      document.querySelector("[data-slot='breadcrumb-list']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='breadcrumb-separator']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='breadcrumb-ellipsis']"),
    ).toBeInTheDocument();
  });

  it("marks the current page and keeps ancestor links navigable", () => {
    renderSampleBreadcrumb();

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(nav).getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );

    const page = within(nav).getByText("Components");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveAttribute("data-slot", "breadcrumb-page");
  });

  it("allows overriding the nav label and separator for i18n", () => {
    render(
      <Breadcrumb aria-label="Trilha de navegação">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Atual</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(
      screen.getByRole("navigation", { name: "Trilha de navegação" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='breadcrumb-separator']"),
    ).toHaveTextContent("/");
  });

  it("renders as the child element when BreadcrumbLink asChild is set", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button type="button">Home</button>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const link = screen.getByRole("button", { name: "Home" });
    expect(link).toHaveAttribute("data-slot", "breadcrumb-link");
  });

  it("renders a BreadcrumbSkeleton matching the trail footprint", () => {
    render(<BreadcrumbSkeleton data-testid="breadcrumb-skeleton" />);

    const skeleton = screen.getByTestId("breadcrumb-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "breadcrumb-skeleton");
    expect(skeleton).toHaveClass("h-5", "w-48", "rounded-md");
  });
});
