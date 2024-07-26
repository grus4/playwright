import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent{
    constructor(page) {
        super(page);
        this.signInButton = page.locator('button.header_signin');
        this.myProfileIcon = page.locator('#userNavDropdown');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}
