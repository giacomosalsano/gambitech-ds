import type * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const getDialog = () => screen.getByRole("alertdialog");
const getTrigger = () => screen.getByRole("button", { name: "Open" });

function renderAlert(
  contentProps: React.ComponentProps<typeof AlertDialogContent> = {},
) {
  return render(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open</Button>
      </AlertDialogTrigger>
      <AlertDialogContent {...contentProps}>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm delete</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  );
}

describe("AlertDialog", () => {
  it("opens as an alertdialog with a centered title", async () => {
    const user = userEvent.setup();
    renderAlert();

    await user.click(getTrigger());

    expect(getDialog()).toBeInTheDocument();
    expect(getDialog()).toHaveAttribute("data-slot", "alert-dialog-content");
    expect(within(getDialog()).getByText("Confirm delete")).toHaveClass(
      "text-center",
    );
    expect(
      getDialog().querySelector('[data-slot="alert-dialog-footer"]'),
    ).toHaveClass("justify-center");
  });

  it("does not render a close button by default", async () => {
    const user = userEvent.setup();
    renderAlert();

    await user.click(getTrigger());

    expect(
      within(getDialog()).queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("renders a close button when showCloseButton is true", async () => {
    const user = userEvent.setup();
    renderAlert({ showCloseButton: true });

    await user.click(getTrigger());

    expect(
      within(getDialog()).getByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
  });

  it("closes via the cancel action", async () => {
    const user = userEvent.setup();
    renderAlert();

    await user.click(getTrigger());
    await user.click(within(getDialog()).getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("does not dismiss on outside click by default", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm delete</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    await user.click(getTrigger());
    onOpenChange.mockClear();

    await user.click(
      document.querySelector('[data-slot="alert-dialog-overlay"]')!,
    );

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
    expect(getDialog()).toBeInTheDocument();
  });
});
