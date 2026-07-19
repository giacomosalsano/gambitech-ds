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
    return baseConfig;
  },
};

export default config;
