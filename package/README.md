# astro-runtime-config

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that allows to retrieve astro configuration object at runtime

## Usage

### Prerequisites

- Astro 4.14+

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-runtime-config
```

```bash
npx astro add astro-runtime-config
```

```bash
yarn astro add astro-runtime-config
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-runtime-config
```

```bash
npm install astro-runtime-config
```

```bash
yarn add astro-runtime-config
```

2. Add the integration to your astro config

```diff
+import astroRuntimeConfig from "astro-runtime-config";

export default defineConfig({
  integrations: [
+    astroRuntimeConfig(),
  ],
});
```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/astro-runtime-config/blob/main/LICENSE). Made with ❤️ by [Dovias](https://github.com/Dovias).
