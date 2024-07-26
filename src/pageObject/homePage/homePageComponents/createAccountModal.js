export default class CreteAccountModal {
    constructor(page) {
        this._page = page;
        this.createAccountContainer = page.locator('app-signup-modal');
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.confirmPasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('.modal-footer .btn-primary');
    }

    async fillCreateAccountForm({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }) {
        firstName && (await this.nameField.fill(firstName));
        lastName && (await this.lastNameField.fill(lastName));
        email && (await this.emailField.fill(email));
        password && (await this.passwordField.fill(password));
        confirmPassword &&
            (await this.confirmPasswordField.fill(confirmPassword));
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async createNewAccount({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }) {
        await this.fillCreateAccountForm({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        });
        await this.clickRegisterButton();
    }
}
