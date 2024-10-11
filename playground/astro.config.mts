import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

const { default: astroRuntimeConfig } = await import("astro-runtime-config");

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    astroRuntimeConfig(),
    hmrIntegration({
      directory: createResolver(import.meta.url).resolve("../package/dist"),
    }),
  ],

  adapter: node({
    mode: "standalone",
  })
});
