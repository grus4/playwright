import { test, expect } from "@playwright/test";

test.describe("Create an account", () => {
  test.only("Create an account with valid data", async ({ page }) => {
    await page.goto("/");

    const signUpButton = page.locator("button.hero-descriptor_btn");
    await signUpButton.click();
  });
});
