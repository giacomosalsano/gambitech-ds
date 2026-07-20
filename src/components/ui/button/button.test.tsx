import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonSkeleton, buttonVariants } from "./button";

describe("Button", () => {
  it("renders its children inside a button element by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });

    expect(button).toHaveClass("bg-destructive");
    expect(button).toHaveClass("h-10");
  });

  it("forwards clicks when enabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await user.click(screen.getByRole("button", { name: "Click" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Docs" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-slot", "button");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  describe("loading state", () => {
    it("announces aria-busy and stays enabled (not disabled)", () => {
      render(<Button loading>Saving</Button>);
      const button = screen.getByRole("button", { name: "Saving" });

      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("data-loading", "true");
      expect(button).not.toBeDisabled();
    });

    it("suppresses click handlers to prevent duplicate submissions", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Saving
        </Button>,
      );

      await user.click(screen.getByRole("button", { name: "Saving" }));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  it("is inert when disabled", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
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
