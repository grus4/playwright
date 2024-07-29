import { expect } from '@playwright/test';
import Header from '../components/Header';
import CreteAccountModal from './homePageComponents/createAccountModal';
import BasePage from '../basePage/BasePage';

export default class HomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button.hero-descriptor_btn'));
        this.signUpButton = page.locator('button.hero-descriptor_btn');
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
        return new CreteAccountModal(this._page);
    }
}
