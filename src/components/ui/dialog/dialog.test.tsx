import type * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const getDialog = () => screen.getByRole("dialog");
const getTrigger = () => screen.getByRole("button", { name: "Open" });

function renderDialog(
  contentProps: React.ComponentProps<typeof DialogContent> = {},
) {
  return render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent {...contentProps}>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  it("opens from the trigger and exposes dialog semantics", async () => {
    const user = userEvent.setup();
    renderDialog();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(getTrigger());

    expect(getDialog()).toBeInTheDocument();
    expect(getDialog()).toHaveAttribute("data-slot", "dialog-content");
    expect(within(getDialog()).getByText("Title")).toBeInTheDocument();
  });

  it("renders the close button by default and dismisses on click", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(getTrigger());

    const close = within(getDialog()).getByRole("button", { name: "Close" });
    await user.click(close);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hides the close button when showCloseButton is false", async () => {
    const user = userEvent.setup();
    renderDialog({ showCloseButton: false });

    await user.click(getTrigger());

    expect(
      within(getDialog()).queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("dismisses when the overlay is clicked by default", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(getTrigger());
    await user.click(document.querySelector('[data-slot="dialog-overlay"]')!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not dismiss on outside click when isOutsideDismissible is false", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent isOutsideDismissible={false}>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(getTrigger());
    onOpenChange.mockClear();

    await user.click(document.querySelector('[data-slot="dialog-overlay"]')!);

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
    expect(getDialog()).toBeInTheDocument();
  });
});
