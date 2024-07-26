import BasePage from "../basePage/BasePage";

export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, '/panel/garage', page.locator('#userNavDropdown'));
        this.myProfileIcon = page.locator('#userNavDropdown');
    }
}