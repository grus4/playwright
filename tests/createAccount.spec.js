import { test, expect } from "@playwright/test";

test.describe("Create an account", () => {
  function generateRandomEmail(prefix = "test") {
    const randomString = Math.random().toString(36).substring(2, 11); // Генерує випадковий рядок довжиною 9 символів
    return `${prefix}_${randomString}@yopmail.com`;
  }

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const signUpButton = page.locator("button.hero-descriptor_btn");
    await signUpButton.click();
  });

  test("Create an account with valid data", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.fill("Max".trim());

    const lastNameField = page.locator("#signupLastName");
    await lastNameField.fill("Danish".trim());

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
    const nameField = page.locator("#signupName");
    await nameField.focus();
    await nameField.blur();

    const registerButton = page.locator(".modal-footer .btn-primary");

    const emptyNameFieldErrorMessage = page.locator(".invalid-feedback > p");
    await expect(emptyNameFieldErrorMessage).toHaveText("Name required");
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(registerButton).toBeDisabled();
  });

  test("Name field with less than minimum characters", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.fill("M");
    const lastNameField = page.locator("#signupLastName");
    await lastNameField.focus();

    const registerButton = page.locator(".modal-footer .btn-primary");
    const errorMessage = page.locator(".invalid-feedback > p");

    await expect(errorMessage).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(registerButton).toBeDisabled();
  });

  test.only("Name field with more than max characters", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.fill("MaxxxMaxxxMaxxxMaxxx2");
    const lastNameField = page.locator("#signupLastName");
    await lastNameField.focus();

    const registerButton = page.locator(".modal-footer .btn-primary");
    const errorMessage = page.locator(".invalid-feedback > p:nth-child(2)");

    await expect(errorMessage).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(registerButton).toBeDisabled();
  });
});
