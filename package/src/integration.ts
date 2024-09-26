import type { AstroConfig } from "astro";
import { defineIntegration } from "astro-integration-kit";

const NAME = "astro-resolved-config";
const VIRTUAL_MODULE_NAME = `${NAME}:config`;
const RESOLVED_VIRTUAL_MODULE_NAME = `\x00${VIRTUAL_MODULE_NAME}`;
const RESOLVED_CONFIG_SYMBOL_KEY = `${VIRTUAL_MODULE_NAME}/config`;

export const integration = defineIntegration({
  name: NAME,
  setup() {
    return {
      hooks: {
        "astro:build:setup": (options) => {
          options.vite = {
            plugins: [
              {
                name: `vite-${NAME}`,

                resolveId: (source) => {
                  return source === VIRTUAL_MODULE_NAME
                    ? RESOLVED_VIRTUAL_MODULE_NAME
                    : null;
                },

                load: (id) => {
                  return id === RESOLVED_VIRTUAL_MODULE_NAME
                    ? `export const astroConfig = globalThis[Symbol.for("${RESOLVED_CONFIG_SYMBOL_KEY}")]; export default astroConfig;`
                    : null;
                },
              },
            ],
          };
        },
        "astro:config:done": ({ injectTypes, config }) => {
          injectTypes({
            filename: "types.d.ts",
            content: `declare module "${VIRTUAL_MODULE_NAME}" {import {AstroConfig} from "astro"; export const astroConfig: AstroConfig; export default astroConfig;}`,
          });

          (
            globalThis as typeof globalThis & {
              [key: symbol]: AstroConfig;
            }
          )[Symbol.for(RESOLVED_CONFIG_SYMBOL_KEY)] = config;
        },
      },
    };
  },
});
