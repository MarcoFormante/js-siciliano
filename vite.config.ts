import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    environment: "happy-dom",
  },
  pack: {
    entry: {
      index: "src/index.ts",
      globale: "src/extensions/globalExtensions.ts",
    },
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: true,
    format: ["esm"],
    exports: false,
  },
  resolve: {
    alias: [
      {
        find: /^js-siciliano\/globale$/,
        replacement: fileURLToPath(
          new URL("./src/extensions/globalExtensions.ts", import.meta.url),
        ),
      },
      {
        find: /^js-siciliano$/,
        replacement: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      },
    ],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
