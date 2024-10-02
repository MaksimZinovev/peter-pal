import { describe, it, expect } from "vitest";
import { getCurrentTheme } from "../src/themeManager.js";

describe("themManager", () => {
  it("should return the current theme", () => {
    const theme = getCurrentTheme();
    expect(theme).toBe("light");
  });
  it("should return a string", () => {
    const theme = getCurrentTheme();
    expect(typeof theme).toBe("string");
  });
  it('should return either "light" or "dark', () => {
    const theme = getCurrentTheme();
    expect(["light", "dark"]).toContain(theme);
  });
});
