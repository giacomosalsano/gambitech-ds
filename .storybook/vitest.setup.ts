import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";

// Applies the Storybook preview (decorators, parameters, globals) when running
// stories as tests through @storybook/addon-vitest. The browser-mode runner is
// still deferred (see CONTRIBUTING.md), so nothing loads this file yet.
const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
