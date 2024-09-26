import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

const { default: astroRuntimeConfig } = await import("astro-runtime-config");

// https://astro.build/config
export default defineConfig({
	integrations: [
		astroRuntimeConfig(),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});
