import { test, expect } from "@playwright/test";

/**
 * Smoke test: ensures the Storybook build boots and serves the manager UI.
 * Component-level interaction tests will be added alongside each primitive.
 */
test("storybook renders the manager shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/storybook/i);
});
