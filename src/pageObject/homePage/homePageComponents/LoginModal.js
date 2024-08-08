import BaseComponent from '../../components/BaseComponent';

export default class LoginModal extends BaseComponent {
    constructor(page) {
        super(page);
        this.emailField = page.locator('#signinEmail');
        this.passwordFiled = page.locator('#signinPassword');
        this.logInButton = page.locator('button[class="btn btn-primary"]');
    }

    async fillInLoginForm({ email, password }) {
        email && (await this.emailField.fill(email));
        password && (await this.passwordFiled.fill(password));
    }

    async login({ email, password }) {
        await this.fillInLoginForm({ email, password });
        await this.logInButton.click();
    }
}
