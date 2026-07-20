import { defineConfig } from "tsdown";

// tsdown (Rolldown) automatically externalizes dependencies and peerDependencies
// for library builds, so react/react-dom are not bundled.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
});
