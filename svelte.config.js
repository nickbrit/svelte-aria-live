import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * Svelte package build config.
 */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        files: {
            lib: "src/lib",
        },
    },
};

export default config;
