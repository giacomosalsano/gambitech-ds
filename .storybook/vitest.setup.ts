import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";

// Applies the Storybook preview (decorators, parameters, globals) when running
// stories as tests through @storybook/addon-vitest. Used only by
// `vitest.storybook.config.ts` (the `pnpm test:stories` project).
const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
