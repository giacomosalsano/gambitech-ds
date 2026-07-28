import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSkeleton,
  CardTitle,
} from "./card";

const getCard = () => screen.getByTestId("card");
const getCardSkeleton = () => screen.getByTestId("card-skeleton");

describe("Card", () => {
  it("renders the compound parts with the expected data-slots", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your profile.</CardDescription>
          <CardAction>
            <button type="button">Edit</button>
          </CardAction>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>,
    );

    expect(getCard()).toHaveAttribute("data-slot", "card");
    expect(screen.getByText("Account").closest("[data-slot]")).toHaveAttribute(
      "data-slot",
      "card-title",
    );
    expect(
      screen.getByText("Manage your profile.").closest("[data-slot]"),
    ).toHaveAttribute("data-slot", "card-description");
    expect(
      screen.getByRole("button", { name: "Edit" }).closest("[data-slot]"),
    ).toHaveAttribute("data-slot", "card-action");
    expect(
      screen.getByText("Body content").closest("[data-slot]"),
    ).toHaveAttribute("data-slot", "card-content");
    expect(
      screen.getByText("Footer actions").closest("[data-slot]"),
    ).toHaveAttribute("data-slot", "card-footer");
  });

  it("applies the card surface tokens", () => {
    render(<Card data-testid="card">Surface</Card>);

    expect(getCard()).toHaveClass("bg-card");
    expect(getCard()).toHaveClass("text-card-foreground");
    expect(getCard()).toHaveClass("rounded-xl");
    expect(getCard()).toHaveClass("border");
  });

  it("merges consumer classNames without dropping the base classes", () => {
    render(
      <Card data-testid="card" className="w-80">
        Surface
      </Card>,
    );

    expect(getCard()).toHaveClass("w-80");
    expect(getCard()).toHaveClass("bg-card");
  });
});

describe("CardSkeleton", () => {
  it("renders a skeleton placeholder matching the card footprint", () => {
    render(<CardSkeleton data-testid="card-skeleton" />);

    expect(getCardSkeleton()).toHaveAttribute("data-slot", "card-skeleton");
    expect(getCardSkeleton()).toHaveClass("h-40");
    expect(getCardSkeleton()).toHaveClass("rounded-xl");
    expect(getCardSkeleton()).toHaveClass("animate-pulse");
  });

  it("allows overriding dimensions via className", () => {
    render(<CardSkeleton data-testid="card-skeleton" className="h-56 w-full" />);

    expect(getCardSkeleton()).toHaveClass("h-56");
    expect(getCardSkeleton()).toHaveClass("w-full");
  });
});
