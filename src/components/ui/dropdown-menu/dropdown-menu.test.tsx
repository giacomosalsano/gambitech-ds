import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const getTrigger = () => screen.getByRole("button", { name: "Open" });
const getMenu = () => screen.getByRole("menu");

describe("DropdownMenu", () => {
  it("opens from the trigger and exposes menu semantics", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(getTrigger());

    expect(getMenu()).toBeInTheDocument();
    expect(getMenu()).toHaveAttribute("data-slot", "dropdown-menu-content");
    expect(within(getMenu()).getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
  });

  it("fires onSelect when an item is chosen", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(getTrigger());
    await user.click(within(getMenu()).getByRole("menuitem", { name: "Profile" }));

    expect(onSelect).toHaveBeenCalled();
  });

  it("supports checkbox items", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Status bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(getTrigger());
    await user.click(
      within(getMenu()).getByRole("menuitemcheckbox", { name: "Status bar" }),
    );

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("marks destructive items via data-variant", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(getTrigger());

    expect(
      within(getMenu()).getByRole("menuitem", { name: "Log out" }),
    ).toHaveAttribute("data-variant", "destructive");
  });
});
