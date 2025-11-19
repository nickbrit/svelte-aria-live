import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            "svelte-aria-live": path.resolve(__dirname, "../src/lib"),
        },
    },
});
