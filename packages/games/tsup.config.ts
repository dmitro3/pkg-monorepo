import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/lib/game-provider.tsx"],
  // loader: {
  //   ".svg": "base64",
  // }
  splitting: true,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  minify: true,
});
