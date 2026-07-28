import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { Toaster, toast } from "./sonner";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Toaster", () => {
  it("exposes the toast helper and mounts without throwing", () => {
    expect(typeof toast).toBe("function");
    expect(typeof toast.success).toBe("function");

    expect(() => render(<Toaster />)).not.toThrow();
  });

  it("shows a toast message after toast() is called", async () => {
    render(<Toaster />);

    act(() => {
      toast("Saved successfully");
    });

    await waitFor(() => {
      expect(screen.getByText("Saved successfully")).toBeInTheDocument();
    });
  });

  it("shows a success toast via toast.success()", async () => {
    render(<Toaster />);

    act(() => {
      toast.success("Profile updated");
    });

    await waitFor(() => {
      expect(screen.getByText("Profile updated")).toBeInTheDocument();
    });
  });
});
