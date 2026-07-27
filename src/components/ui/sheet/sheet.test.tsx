import type * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants,
} from "./sheet";

const getSheet = () => screen.getByRole("dialog");
const getTrigger = () => screen.getByRole("button", { name: "Open" });

function renderSheet(
  contentProps: React.ComponentProps<typeof SheetContent> = {},
) {
  return render(
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent {...contentProps}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Adjust the filters.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>,
  );
}

describe("Sheet", () => {
  it("opens from the trigger as a dialog drawer", async () => {
    const user = userEvent.setup();
    renderSheet();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(getTrigger());

    expect(getSheet()).toBeInTheDocument();
    expect(getSheet()).toHaveAttribute("data-slot", "sheet-content");
    expect(getSheet()).toHaveAttribute("data-side", "right");
  });

  it("applies the requested side variant", async () => {
    const user = userEvent.setup();
    renderSheet({ side: "left" });

    await user.click(getTrigger());

    expect(getSheet()).toHaveAttribute("data-side", "left");
    expect(getSheet()).toHaveClass("left-0");
  });

  it("renders the close button by default and dismisses on click", async () => {
    const user = userEvent.setup();
    renderSheet();

    await user.click(getTrigger());

    const close = within(getSheet()).getByRole("button", { name: "Close" });
    await user.click(close);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hides the close button when showCloseButton is false", async () => {
    const user = userEvent.setup();
    renderSheet({ showCloseButton: false });

    await user.click(getTrigger());

    expect(
      within(getSheet()).queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("does not dismiss on outside click when isOutsideDismissible is false", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent isOutsideDismissible={false}>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Adjust the filters.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    await user.click(getTrigger());
    onOpenChange.mockClear();

    await user.click(document.querySelector('[data-slot="sheet-overlay"]')!);

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
    expect(getSheet()).toBeInTheDocument();
  });

  it("exposes sheetContentVariants for consumers", () => {
    expect(typeof sheetContentVariants).toBe("function");
    expect(sheetContentVariants({ side: "bottom" })).toContain("bottom-0");
  });
});
