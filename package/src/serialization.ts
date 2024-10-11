import type { AstroConfig } from "astro";
import type { DeepSubstituteCircularPropertyValue, DeepOmitProperty, DeepSubstitutePropertyValue } from "./types/deep.ts"

declare const serializedAstroConfigSymbol: unique symbol;

export type SerializedAstroConfig = string & {
	[serializedAstroConfigSymbol]: undefined
}

export type DeserializedAstroConfig =
	DeepSubstituteCircularPropertyValue<
		DeepOmitProperty<
			DeepSubstitutePropertyValue<
				DeepSubstitutePropertyValue<
					DeepSubstitutePropertyValue<
						AstroConfig,
						Function,
						null	
					>,
					number,
					number | null
				>,
				bigint,
				string
			>,
			symbol
		>,
		object,
		null
	>;

export function serializeAstroConfig(config: AstroConfig) {
	const seen = new WeakSet();
	return JSON.stringify(config, (_, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}

		const valueType = typeof value;
		if (valueType === "function") {
			return null;
		} else if (valueType === "bigint") {
			return value.toString();
		} else {
			return value;
		}
	}) as SerializedAstroConfig;
}

export function deserializeAstroConfig(config: SerializedAstroConfig) {
	return JSON.parse(config) as DeserializedAstroConfig;	
}
