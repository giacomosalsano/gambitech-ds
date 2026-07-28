import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandSkeleton,
} from "./command";

beforeAll(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
  });

  Element.prototype.scrollIntoView = vi.fn();
});

function renderCommandPalette() {
  return render(
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="search">
            Search
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">Profile</CommandItem>
          <CommandItem value="billing" disabled>
            Billing
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>,
  );
}

describe("Command", () => {
  it("renders the compound parts with the expected data-slots", () => {
    renderCommandPalette();

    expect(document.querySelector("[data-slot='command']")).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='command-input']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='command-list']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='command-group']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='command-separator']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='command-shortcut']"),
    ).toHaveTextContent("⌘K");
  });

  it("filters items based on the search input", async () => {
    const user = userEvent.setup();
    renderCommandPalette();

    await user.type(
      screen.getByPlaceholderText("Type a command..."),
      "prof",
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderCommandPalette();

    await user.type(
      screen.getByPlaceholderText("Type a command..."),
      "zzzz-no-match",
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("calls onSelect when an item is chosen", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="calendar" onSelect={onSelect}>
            Calendar
          </CommandItem>
        </CommandList>
      </Command>,
    );

    await user.click(screen.getByText("Calendar"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("renders CommandDialog with accessible title and description", () => {
    render(
      <CommandDialog
        open
        onOpenChange={() => undefined}
        title="Palette"
        description="Find anything"
      >
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="calendar">Calendar</CommandItem>
        </CommandList>
      </CommandDialog>,
    );

    expect(screen.getByText("Palette")).toBeInTheDocument();
    expect(screen.getByText("Find anything")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
  });
});

describe("CommandSkeleton", () => {
  it("renders a skeleton placeholder matching the command footprint", () => {
    render(<CommandSkeleton data-testid="command-skeleton" />);

    const skeleton = screen.getByTestId("command-skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "command-skeleton");
    expect(skeleton).toHaveClass("h-72");
    expect(skeleton).toHaveClass("animate-pulse");
  });
});
