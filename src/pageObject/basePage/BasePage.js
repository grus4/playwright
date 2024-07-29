import Header from '../components/Header';
import { expect } from '@playwright/test';

export default class BasePage {
    constructor(page, url, waitPageSelector) {
        this._page = page;
        this._url = url;
        this._waitPageSelector = waitPageSelector;
        this._header = new Header(page);
    }

    async navigateToPage() {
        await this._page.goto(this._url);
        await this._page.waitForLoadState();
        await expect(this._waitPageSelector).toBeVisible();
    }
}
