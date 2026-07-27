import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const getTrigger = () => screen.getByRole("button", { name: "Open" });

describe("Popover", () => {
  it("opens from the trigger and shows content", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();

    await user.click(getTrigger());

    const content = screen.getByText("Popover body");
    expect(content).toBeInTheDocument();
    expect(content.closest("[data-slot='popover-content']")).toHaveAttribute(
      "data-slot",
      "popover-content",
    );
  });

  it("closes when the trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    await user.click(getTrigger());
    expect(screen.getByText("Popover body")).toBeInTheDocument();

    await user.click(getTrigger());
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("forwards align to the content", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent align="start">Aligned</PopoverContent>
      </Popover>,
    );

    await user.click(getTrigger());

    expect(
      screen.getByText("Aligned").closest("[data-slot='popover-content']"),
    ).toHaveAttribute("data-align", "start");
  });
});
