import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["postgres-data", "node_modules"],
  },
});
