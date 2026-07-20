import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonSkeleton, buttonVariants } from "./button";

let buttonName = "Save";
const getButton = () => screen.getByRole("button", { name: buttonName });
const getLink = () => screen.getByRole("link", { name: buttonName });

describe("Button", () => {
  it("renders its children inside a button element by default", () => {
    render(<Button>{buttonName}</Button>);

    expect(getButton()).toBeInTheDocument();
    expect(getButton()).toHaveAttribute("data-slot", "button");
  });

  it("applies variant and size classes", () => {
    buttonName = "Delete";
    render(
      <Button variant="destructive" size="lg">
        {buttonName}
      </Button>,
    );

    expect(getButton()).toHaveClass("bg-destructive");
    expect(getButton()).toHaveClass("h-10");
  });

  it("forwards clicks when enabled", async () => {
    buttonName = "Click";
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>{buttonName}</Button>);

    await user.click(getButton());

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as the child element when asChild is set", () => {
    buttonName = "Docs";
    render(
      <Button asChild>
        <a href="/docs">{buttonName}</a>
      </Button>,
    );

    expect(getLink()).toBeInTheDocument();
    expect(getLink()).toHaveAttribute("data-slot", "button");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  describe("loading state", () => {
    it("announces aria-busy and stays enabled (not disabled)", () => {
      buttonName = "Saving";
      render(<Button isLoading>{buttonName}</Button>);

      expect(getButton()).toHaveAttribute("aria-busy", "true");
      expect(getButton()).toHaveAttribute("data-loading", "true");
      expect(getButton()).not.toBeDisabled();
    });

    it("suppresses click handlers to prevent duplicate submissions", async () => {
      buttonName = "Saving";
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button isLoading onClick={onClick}>
          {buttonName}
        </Button>,
      );

      await user.click(getButton());

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  it("is inert when disabled", () => {
    buttonName = "Disabled";
    render(<Button disabled>{buttonName}</Button>);

    expect(getButton()).toBeDisabled();
  });

  it("exposes buttonVariants for consumers", () => {
    expect(typeof buttonVariants).toBe("function");
    expect(buttonVariants({ variant: "outline" })).toContain("border");
  });
});

describe("ButtonSkeleton", () => {
  it("renders a skeleton placeholder with the matching size footprint", () => {
    render(<ButtonSkeleton data-testid="button-skeleton" size="lg" />);
    const skeleton = screen.getByTestId("button-skeleton");

    expect(skeleton).toHaveAttribute("data-slot", "button-skeleton");
    expect(skeleton).toHaveClass("h-10");
    expect(skeleton).toHaveClass("animate-pulse");
  });
});
