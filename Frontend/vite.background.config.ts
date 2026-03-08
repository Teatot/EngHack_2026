import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    publicDir: false,
    build: {
        outDir: "public",
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, "src/scrap/background.js"),
            name: "background",
            fileName: () => "background.js",
            formats: ["iife"],
        },
        rollupOptions: {
            output: {
                entryFileNames: "background.js",
            },
        },
    },
});
