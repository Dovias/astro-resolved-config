type IfNever<T, Y, N> = [T] extends [never] ? Y : N;
type Intersects<A, B> = IfNever<Extract<true, A extends B ? true : false>, false, true>;

type DeepSubstitute<
	T,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>,
	V,
	SV extends IfNever<V, never, unknown>,
	S extends object[] = []
> =
	T extends object
		? T extends S[number]
			? T
			: { [MK in keyof T as MK extends K ? SK : MK]:
					MK extends IfNever<K, PropertyKey, K>
						? Intersects<T[MK], V> extends true
							? IfNever<V, T[MK], SV>
							: DeepSubstitute<T[MK], K, SK, V, SV, [...S, T]>  
						: DeepSubstitute<T[MK], K, SK, V, SV, [...S, T]>; 
				}
		: T;

export type DeepSubstituteProperty<
	T extends object,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>,
	V,
	SV extends IfNever<V, never, unknown>
> = DeepSubstitute<T, K, SK, V, SV>

export type DeepSubstitutePropertyValue<
	T extends object,
	V,
	SV extends IfNever<V, never, unknown>
> = DeepSubstitute<T, never, never, V, SV>;

export type DeepSubstitutePropertyKey<
	T extends object,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>
> = DeepSubstitute<T, K, SK, never, never>;

export type DeepOmitProperty<
	T extends object,
	K extends PropertyKey
> = DeepSubstitutePropertyKey<T, K, never>;



export type DeepCircularSubstitute<
	T,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>,
	V extends object = never,
	SV extends IfNever<V, never, unknown> = never,
	S extends object[] = []
> =
	T extends object
		? T extends S[number]
			? T
			: { [MK in keyof T as MK extends K
						? Intersects<T[MK], IfNever<V, object, V & S[number]>> extends true ? SK : MK
						: MK
					]: MK extends IfNever<K, PropertyKey, K>
						? Intersects<T[MK], V & S[number]> extends true
							? IfNever<V, T[MK], SV>
							: DeepCircularSubstitute<T[MK], K, SK, V, SV, [...S, T]>  
						: DeepCircularSubstitute<T[MK], K, SK, V, SV, [...S, T]>;
				}
		: T;

export type DeepSubstituteCircularProperty<
	T extends object,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>,
	V extends object = never,
	SV extends IfNever<V, never, unknown> = never
> = DeepCircularSubstitute<T, K, SK, V, SV>;

export type DeepSubstituteCircularPropertyValue<
	T extends object,
	V extends object,
	SV extends IfNever<V, never, unknown>
> = DeepCircularSubstitute<T, never, never, V, SV>;

export type DeepSubstituteCircularPropertyKey<
	T extends object,
	K extends PropertyKey,
	SK extends IfNever<K, never, PropertyKey>
> = DeepCircularSubstitute<T, K, SK>;

export type DeepOmitCircularProperty<
	T extends object,
	K extends PropertyKey
> = DeepSubstituteCircularPropertyKey<T, K, never>;
