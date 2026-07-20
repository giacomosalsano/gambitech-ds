import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(baseConfig) {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    baseConfig.plugins = [...(baseConfig.plugins ?? []), tailwindcss()];
    baseConfig.resolve = {
      ...baseConfig.resolve,
      alias: {
        ...baseConfig.resolve?.alias,
        // Mirror the `@/*` -> `src/*` path from tsconfig.json so both the
        // Storybook dev server and the production build resolve library imports.
        "@": fileURLToPath(new URL("../src", import.meta.url)),
      },
    };
    return baseConfig;
  },
};

export default config;
