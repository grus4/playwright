import { test, expect } from "@playwright/test";

test.describe("Create an account", () => {
  function generateRandomEmail(prefix = "test") {
    const randomString = Math.random().toString(36).substring(2, 11); // Генерує випадковий рядок довжиною 9 символів
    return `${prefix}_${randomString}@yopmail.com`;
  }

  test("Create an account with valid data", async ({ page }) => {
    await page.goto("/");

    const signUpButton = page.locator("button.hero-descriptor_btn");
    await signUpButton.click();

    const nameField = page.locator("#signupName");
    await nameField.fill("Max");

    const lastNameField = page.locator("#signupLastName");
    await lastNameField.fill("Danish");

    const emailField = page.locator("#signupEmail");
    await emailField.fill(generateRandomEmail());

    const passwordField = page.locator("#signupPassword");
    await passwordField.fill("Qwert_1234");

    const confirmPasswordField = page.locator("#signupRepeatPassword");
    await confirmPasswordField.fill("Qwert_1234");

    const registerButton = page.locator(".modal-footer .btn-primary");
    await registerButton.click();

    const myProfileIcon = page.locator("#userNavDropdown");
    await expect(myProfileIcon).toBeVisible();
  });

  test("The empty Name field validation", async ({ page }) => {
    await page.goto("/");

    const signUpButton = page.locator("button.hero-descriptor_btn");
    await signUpButton.click();

    const nameField = page.locator("#signupName");
    await nameField.focus();
    await nameField.blur();

    const registerButton = page.locator(".modal-footer .btn-primary");

    const emptyNameFieldErrorMessage = page.locator(".invalid-feedback > p");
    await expect(emptyNameFieldErrorMessage).toHaveText("Name required");
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(registerButton).toBeDisabled();
  });
});
