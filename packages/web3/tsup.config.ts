import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/api"],
  splitting: true,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  minify: true,
});
