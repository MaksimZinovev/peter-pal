import { describe, it, expect, vi } from "vitest";
import { debounce } from "../src/utils";

describe("debounce", () => {
  it("should debounce a function call", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(mockFn).toHaveBeenCalled();
  });
});
