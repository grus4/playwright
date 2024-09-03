import LoginModal from '../homePage/homePageComponents/LoginModal';
import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
    constructor(page) {
        super(page);
        this.signInButton = page.locator('button.header_signin');
        this.myProfileIcon = page.locator('#userNavDropdown');
    }

    async openSignInForm() {
        await this.signInButton.click();
        return new LoginModal(this._page);
    }
}
