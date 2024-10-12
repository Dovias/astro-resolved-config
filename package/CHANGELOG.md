# astro-runtime-config

## 2.0.0

### Major Changes
- **SSR output mode support**. This update introduces support for SSR based output mode rendering with the introduction of deserialized configuration objects.
- **New virtual modules.** Previously, astro integration would utilize one `astro-runtime-config:config` virtual module to return astro configuration object. This is no longer the case. This new update introduces two new virtual modules (`astro-runtime-config:forwarded` and `astro-runtime-config:deserialized`) which return astro configuration objects.

  **Differences between new virtual modules.** The main difference between `astro-runtime-config:forwarded` and `astro-runtime-config:deserialized` is that they're designed to work in different output modes. `astro-runtime-config:deserialized` is generally preferred way to get the most important information from astro configuration object, but it has some caveats. As the name suggests, `astro-runtime-config:deserialized` returns deserialized version of astro configuration object. That means that this Astro configuration object differs a bit, in terms of what kind of values will be returned. The main difference is that the `astro-runtime-config:deserialized` would return existing `Function`, `Symbol` object instances as `null`, `bigint`s would be converted to `string`s and astro configuration object properties with `Symbol` keys would be removed. If the existing project relies on SSG output and it needs to bypass `astro-runtime-config:deserialized` constraints, it should utilize `astro-runtime-config:forwarded` virtual module instead.
  
> [!WARNING]
> Although `astro-runtime-config:forwarded` does work in `dev` and `preview` environments with SSR output mode, it should be known that this module does not work in SSR-based production environments! **Do not use this module in SSR-based projects, unless you know what you are doing!**
- **Custom configuration object forwarding.** You can now forward your own custom Astro configuration objects from integration configuration object:
  ```ts
  integrations: [
  astroRuntimeConfig({
    forward: customAstroConfig
  }
  ```
  In this case `customAstroConfig` of type `AstroConfig` will be accessible through `astro-runtime-config:forwarded` and `astro-runtime-config:deserialized` virtual modules.
  
- **Programmatical configuration object serialization.** This update introduces a way to serialize and deserialize `AstroConfig` configuration object using `serializeAstroConfig` and `deserializeAstroConfig` functions inside `astro-runtime-config` module.
> [!NOTE]
> `deserializeAstroConfig` function outputs identical output to `astro-runtime-config:deserialized` virtual module exported object.

- **Programmatical custom configuration object forwarding.** This update also introduces a way to programatically forward and retrieve forwarded configuration objects via `getForwardedAstroConfiguration` and `forwardAstroConfig` functions inside `astro-runtime-config` module.
> [!NOTE]
> `forwardAstroConfig` function behaves identically as `forward` property inside integration configuration object. This function should be used if you want to forward astro configuration object from different entrypoints.

> [!NOTE]
> `getForwardedAstroConfig` function only returns forwarded type of Astro configuration object. Use `astro-runtime-config:deserialized` module if there is need to get **deserialized** version of forwarded astro configuration object that works in any output mode.

## 1.0.0

### Major Changes

- First major release of the package
