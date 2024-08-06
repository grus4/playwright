import { test, expect } from '@playwright/test';
import HomePage from '../src/pageObject/homePage/HomePage';
import GaragePage from '../src/pageObject/garagePage/GaragePage';

test.describe('Create an account POM', () => {
     /** @type {HomePage} */
    let createAccountModal;

    function generateRandomEmail(prefix = 'test') {
        const randomString = Math.random().toString(36).substring(2, 11); // Генерує випадковий рядок довжиною 9 символів
        return `${prefix}_${randomString}@yopmail.com`;
    }

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        homePage.navigateToPage();
        createAccountModal = await homePage.clickSignUpButton();
    });

    test.only('Create an account with valid data @smoke', async ({ page }) => {
        await createAccountModal.createNewAccount({
            firstName: 'Max',
            lastName: 'Danish',
            email: generateRandomEmail(),
            password: 'Qwert_1234',
            confirmPassword: 'Qwert_1234',
        });
        
        const garagePage = new GaragePage(page);
        await expect(garagePage.myProfileIcon).toBeVisible();
    });

    test('The empty Name field validation', async ({ page }) => {
        await createAccountModal.nameField.focus();
        await createAccountModal.nameField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Name required'
        );
        await expect(createAccountModal.nameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('Name field with less than minimum characters', async ({ page }) => {
        await createAccountModal.nameField.fill('M');
        await createAccountModal.lastNameField.focus();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Name has to be from 2 to 20 characters long'
        );
        await expect(createAccountModal.nameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('Name field with more than max characters', async ({ page }) => {
        await createAccountModal.nameField.fill('MaxxxMaxxxMaxxxMaxxx2');
        await createAccountModal.lastNameField.focus();

        await expect(
            createAccountModal.wrongNumberOfEnteredCharactersErrorMessage
        ).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(createAccountModal.nameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The invalid Name field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max@#');
        await createAccountModal.lastNameField.focus();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Name is invalid'
        );
        await expect(createAccountModal.nameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The empty Last Name field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.focus();
        await createAccountModal.lastNameField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Last name required'
        );
        await expect(createAccountModal.lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('Last Name field with less than minimum characters', async ({
        page,
    }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('D');
        await createAccountModal.emailField.focus();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Last name has to be from 2 to 20 characters long'
        );
        await expect(createAccountModal.lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('Last Name field with more than max characters', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('MaxxxMaxxxMaxxxMaxxx2');
        await createAccountModal.emailField.focus();

        await expect(
            createAccountModal.wrongNumberOfEnteredCharactersErrorMessage
        ).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(createAccountModal.lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The invalid Last Name field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Max@#');
        await createAccountModal.emailField.focus();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Last name is invalid'
        );
        await expect(createAccountModal.lastNameField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The empty Email field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.focus();
        await createAccountModal.emailField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Email required'
        );
        await expect(createAccountModal.emailField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The invalid Email field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.fill('test1:@@yopmail.com');
        await createAccountModal.passwordField.fill('Qwert_1234');

        await expect(createAccountModal.errorMessage).toHaveText(
            'Email is incorrect'
        );
        await expect(createAccountModal.emailField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The empty Password field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.fill(generateRandomEmail());
        await createAccountModal.passwordField.focus();
        await createAccountModal.passwordField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Password required'
        );
        await expect(createAccountModal.passwordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The invalid Password field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.fill(generateRandomEmail());
        await createAccountModal.passwordField.fill('123rtewi');
        await createAccountModal.confirmPasswordField.focus();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );
        await expect(createAccountModal.passwordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('The empty Confirm Password field validation', async ({ page }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.fill(generateRandomEmail());
        await createAccountModal.passwordField.fill('Qwert_1234');
        await createAccountModal.confirmPasswordField.focus();
        await createAccountModal.confirmPasswordField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Re-enter password required'
        );
        await expect(createAccountModal.confirmPasswordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });

    test('Verifying mismatching a Password in the Password and Confirm Password fields', async ({
        page,
    }) => {
        await createAccountModal.nameField.fill('Max');
        await createAccountModal.lastNameField.fill('Danish');
        await createAccountModal.emailField.fill(generateRandomEmail());
        await createAccountModal.passwordField.fill('Qwert_1234');
        await createAccountModal.confirmPasswordField.fill('Qwert_12345');
        await createAccountModal.confirmPasswordField.focus();
        await createAccountModal.confirmPasswordField.blur();

        await expect(createAccountModal.errorMessage).toHaveText(
            'Passwords do not match'
        );
        await expect(createAccountModal.confirmPasswordField).toHaveCSS(
            'border-color',
            'rgb(220, 53, 69)'
        );
        await expect(createAccountModal.registerButton).toBeDisabled();
    });
    
});
