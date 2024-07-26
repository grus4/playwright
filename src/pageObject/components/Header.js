import { expect } from '@playwright/test';

export default class Header {
    constructor(page) {
        this._page = page;
        this.signInButton = page.locator('button.header_signin');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}
