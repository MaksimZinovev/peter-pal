import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
        reporter: ['text', 'json', 'html'],
        provider: 'v8'
    }
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    globals: true,
  },
});
