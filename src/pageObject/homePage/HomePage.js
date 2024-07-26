import { expect } from '@playwright/test';
import Header from '../components/Header';

export default class HomePage {
    constructor(page) {
        this._page = page;
        this._url = '/';
        this._waitPageSelector = 'button.header_signin';
        this._header = new Header(page);
        this.signUpButton = page.locator('button.hero-descriptor_btn');
    }

    async navigateToPage() {
        await this._page.goto(this._url);
        await expect(this._page.locator(this._waitPageSelector)).toBeVisible();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}
