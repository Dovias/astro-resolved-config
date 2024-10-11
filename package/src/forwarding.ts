import type { AstroConfig } from "astro";

export type ForwardedAstroConfig<T extends AstroConfig["output"] = "hybrid"> =
	T extends "static"
		? AstroConfig
		: AstroConfig | undefined;

const forwardSymbol = Symbol.for("astro-forwarded-config");

const forwardStore = globalThis as typeof globalThis & {
	[forwardSymbol]?: ForwardedAstroConfig;
}

export function forwardAstroConfig(config: AstroConfig) {
	forwardStore[forwardSymbol] = config;	
}

export function getForwardedAstroConfig() {
	return forwardStore[forwardSymbol];
}
