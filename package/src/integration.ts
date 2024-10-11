import { addVitePlugin, defineIntegration } from "astro-integration-kit";
import { serializeAstroConfig } from "./serialization.ts";
import { forwardAstroConfig, getForwardedAstroConfig } from "./forwarding.ts";

const rootModuleName = "astro-runtime-config";
const forwardedVirtualModuleName = `${rootModuleName}:forwarded`;
const deserializedVirtualModuleName = `${rootModuleName}:deserialized`;

export const integration = defineIntegration({
	name: rootModuleName,
	setup() {
		return {
			hooks: {
				"astro:config:setup": (options) => {
					addVitePlugin(options, {
						plugin: {
							name: `vite-${rootModuleName}`,
							resolveId: (source) => {
								return source === forwardedVirtualModuleName ||
									source === deserializedVirtualModuleName
										? `\x00${source}`
										: null;
							},
							load: (id) => {
								if (id === `\x00${forwardedVirtualModuleName}`) {
									return `import { getForwardedAstroConfig } from "${rootModuleName}";

export const forwardedAstroConfig = getForwardedAstroConfig();
export default forwardedAstroConfig;`;
								} else if (id === `\x00${deserializedVirtualModuleName}`) {
									return `export const deserializedAstroConfig = ${serializeAstroConfig(getForwardedAstroConfig()!)};
export default deserializedAstroConfig;`;
								}
								return null;
							}
						},
					});
				},
				"astro:config:done": ({ config, injectTypes }) => {
					forwardAstroConfig(config);

					injectTypes({
						filename: "forwarded.d.ts",
						content: `declare module "${forwardedVirtualModuleName}" {
	import type { ForwardedAstroConfig } from "${rootModuleName}";

	export type { ForwardedAstroConfig };
	export const forwardedAstroConfig: ForwardedAstroConfig<"${config.output}">;
	export default forwardedAstroConfig;
}`
					});

					injectTypes({
						filename: "deserialized.d.ts",
						content: `declare module "${deserializedVirtualModuleName}" {
	import type { DeserializedAstroConfig } from "${rootModuleName}";

	export type { DeserializedAstroConfig };
	export const deserializedAstroConfig: DeserializedAstroConfig;
	export default deserializedAstroConfig;
}`,
					});
				}
			}
		};
	}
});
