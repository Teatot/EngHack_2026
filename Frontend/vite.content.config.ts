import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/scrap/scrapeDOM.js"),
      name: "contentScript",
      fileName: () => "scrapeDOM.js",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "scrapeDOM.js",
      },
    },
  },
});
