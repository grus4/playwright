import { test, expect } from '@playwright/test';

test.describe('Create an account', () => {
    function generateRandomEmail(prefix = 'test') {
        const randomString = Math.random().toString(36).substring(2, 11); // Генерує випадковий рядок довжиною 9 символів
        return `${prefix}_${randomString}@yopmail.com`;
    }

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await signUpButton.click();
    });

    test('Create an account with valid data', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill(generateRandomEmail());

        const passwordField = page.locator('#signupPassword');
        await passwordField.fill('Qwert_1234');

        const confirmPasswordField = page.locator('#signupRepeatPassword');
        await confirmPasswordField.fill('Qwert_1234');

        const registerButton = page.locator('.modal-footer .btn-primary');
        await registerButton.click();

        const myProfileIcon = page.locator('#userNavDropdown');
        await expect(myProfileIcon).toBeVisible();
    });

    test('The empty Name field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.focus();
        await nameField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const emptyNameFieldErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(emptyNameFieldErrorMessage).toHaveText('Name required');
        await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('Name field with less than minimum characters', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('M');
        const lastNameField = page.locator('#signupLastName');
        await lastNameField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p');

        await expect(errorMessage).toHaveText(
            'Name has to be from 2 to 20 characters long'
        );
        await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('Name field with more than max characters', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('MaxxxMaxxxMaxxxMaxxx2');
        const lastNameField = page.locator('#signupLastName');
        await lastNameField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p:nth-child(2)');

        await expect(errorMessage).toHaveText(
            'Name has to be from 2 to 20 characters long'
        );
        await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('The invalid Name field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max@#');
        const lastNameField = page.locator('#signupLastName');
        await lastNameField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p');

        await expect(errorMessage).toHaveText('Name is invalid');
        await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('The empty Last Name field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.focus();
        await lastNameField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const emptyLastNameFieldErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(emptyLastNameFieldErrorMessage).toHaveText(
            'Last name required'
        );
        await expect(lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('Last Name field with less than minimum characters', async ({
        page,
    }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max');
        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('D');

        const emailField = page.locator('#signupEmail');
        await emailField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p');

        await expect(errorMessage).toHaveText(
            'Last name has to be from 2 to 20 characters long'
        );
        await expect(lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('Last Name field with more than max characters', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max');

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('MaxxxMaxxxMaxxxMaxxx2');

        const emailField = page.locator('#signupEmail');
        await emailField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p:nth-child(2)');

        await expect(errorMessage).toHaveText(
            'Last name has to be from 2 to 20 characters long'
        );
        await expect(lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('The invalid Last Name field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max');
        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Max@#');

        const emailField = page.locator('#signupEmail');
        await emailField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');
        const errorMessage = page.locator('.invalid-feedback > p');

        await expect(errorMessage).toHaveText('Last name is invalid');
        await expect(lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('The empty Email field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.focus();
        await emailField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const emptyEmailFieldErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(emptyEmailFieldErrorMessage).toHaveText('Email required');
        await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('The invalid Email field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill('test1:@@yopmail.com');

        const passwordField = page.locator('#signupPassword');
        await passwordField.fill('Qwert_1234');

        const registerButton = page.locator('.modal-footer .btn-primary');

        const invalidEmailErrorMessage = page.locator('.invalid-feedback > p');
        await expect(invalidEmailErrorMessage).toHaveText('Email is incorrect');
        await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    test('The empty Password field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill(generateRandomEmail());

        const passwordField = page.locator('#signupPassword');
        await passwordField.focus();
        await passwordField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const emptyPasswordFieldErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(emptyPasswordFieldErrorMessage).toHaveText(
            'Password required'
        );
        await expect(passwordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('The invalid Password field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill(generateRandomEmail());

        const passwordField = page.locator('#signupPassword');
        await passwordField.fill('123rtewi');

        const confirmPasswordField = page.locator('#signupRepeatPassword');
        await confirmPasswordField.focus();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const invalidPasswordErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(invalidPasswordErrorMessage).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );
        await expect(passwordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('The empty Confirm Password field validation', async ({ page }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill(generateRandomEmail());

        const passwordField = page.locator('#signupPassword');
        await passwordField.fill('Qwert_1234');

        const confirmPasswordField = page.locator('#signupRepeatPassword');
        await confirmPasswordField.focus();
        await confirmPasswordField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const emptyConfirmPasswordFieldErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(emptyConfirmPasswordFieldErrorMessage).toHaveText(
            'Re-enter password required'
        );
        await expect(confirmPasswordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });

    test('Verifying mismatching a Password in the Password and Confirm Password fields', async ({
        page,
    }) => {
        const nameField = page.locator('#signupName');
        await nameField.fill('Max'.trim());

        const lastNameField = page.locator('#signupLastName');
        await lastNameField.fill('Danish'.trim());

        const emailField = page.locator('#signupEmail');
        await emailField.fill(generateRandomEmail());

        const passwordField = page.locator('#signupPassword');
        await passwordField.fill('Qwert_1234');

        const confirmPasswordField = page.locator('#signupRepeatPassword');
        await confirmPasswordField.fill('Qwert_12345');
        await confirmPasswordField.focus();
        await confirmPasswordField.blur();

        const registerButton = page.locator('.modal-footer .btn-primary');

        const passwordMismatchingErrorMessage = page.locator(
            '.invalid-feedback > p'
        );
        await expect(passwordMismatchingErrorMessage).toHaveText(
            'Passwords do not match'
        );
        await expect(confirmPasswordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(registerButton).toBeDisabled();
    });
});
