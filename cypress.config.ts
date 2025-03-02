import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // ✅ Correct Next.js server URL
    supportFile: false,
  },
});
