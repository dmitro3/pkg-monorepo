import { defineConfig } from "tsup";
import svgr from "esbuild-plugin-svgr"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  minify: true,
});
