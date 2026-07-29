import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import {
  DataList,
  DataListSkeleton,
  EntityRow,
  EntityRowActions,
  EntityRowContent,
  EntityRowMeta,
  EntityRowSkeleton,
  EntityRowTitle,
  EntityRowValue,
} from "./data-list";

function renderSampleList() {
  return render(
    <DataList data-testid="data-list" aria-label="Plans">
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Starter</EntityRowTitle>
          <EntityRowMeta>3 services · monthly</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 99,00</EntityRowValue>
        <EntityRowActions>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </EntityRowActions>
      </EntityRow>
      <EntityRow>
        <EntityRowContent>
          <EntityRowTitle>Pro</EntityRowTitle>
          <EntityRowMeta>Unlimited · monthly</EntityRowMeta>
        </EntityRowContent>
        <EntityRowValue>R$ 199,00</EntityRowValue>
        <EntityRowActions>
          <Button variant="destructive" size="sm">
            Deactivate
          </Button>
        </EntityRowActions>
      </EntityRow>
    </DataList>,
  );
}

describe("DataList / EntityRow", () => {
  it("renders a list with entity rows and compound slots", () => {
    renderSampleList();

    const list = screen.getByRole("list", { name: "Plans" });
    expect(list).toHaveAttribute("data-slot", "data-list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);

    expect(screen.getByText("Starter")).toHaveAttribute(
      "data-slot",
      "entity-row-title",
    );
    expect(screen.getByText("3 services · monthly")).toHaveAttribute(
      "data-slot",
      "entity-row-meta",
    );
    expect(screen.getByText("R$ 99,00")).toHaveAttribute(
      "data-slot",
      "entity-row-value",
    );
    expect(screen.getByText("R$ 99,00")).toHaveClass("tabular-nums");
    expect(
      document.querySelector("[data-slot='entity-row-actions']"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Edit" }),
    ).toBeInTheDocument();
  });

  it("allows localized copy via children", () => {
    render(
      <DataList aria-label="Planos">
        <EntityRow>
          <EntityRowContent>
            <EntityRowTitle>Básico</EntityRowTitle>
            <EntityRowMeta>3 serviços · mensal</EntityRowMeta>
          </EntityRowContent>
          <EntityRowValue>R$ 99,00</EntityRowValue>
          <EntityRowActions>
            <Button size="sm">Editar</Button>
          </EntityRowActions>
        </EntityRow>
      </DataList>,
    );

    expect(screen.getByRole("list", { name: "Planos" })).toBeInTheDocument();
    expect(screen.getByText("Básico")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
  });

  it("merges consumer classNames without dropping base tokens", () => {
    render(
      <DataList data-testid="data-list" className="max-w-lg">
        <EntityRow className="bg-muted/30">
          <EntityRowTitle>Item</EntityRowTitle>
        </EntityRow>
      </DataList>,
    );

    expect(screen.getByTestId("data-list")).toHaveClass("max-w-lg", "border");
    expect(screen.getByRole("listitem")).toHaveClass("bg-muted/30", "flex");
  });

  it("renders skeletons matching list and row footprints", () => {
    render(
      <>
        <DataListSkeleton data-testid="data-list-skeleton" />
        <EntityRowSkeleton data-testid="entity-row-skeleton" />
      </>,
    );

    expect(screen.getByTestId("data-list-skeleton")).toHaveAttribute(
      "data-slot",
      "data-list-skeleton",
    );
    expect(screen.getByTestId("data-list-skeleton")).toHaveClass(
      "h-48",
      "rounded-xl",
    );
    expect(screen.getByTestId("entity-row-skeleton")).toHaveAttribute(
      "data-slot",
      "entity-row-skeleton",
    );
    expect(screen.getByTestId("entity-row-skeleton")).toHaveClass("h-16");
  });
});
