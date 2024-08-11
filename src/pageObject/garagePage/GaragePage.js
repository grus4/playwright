import BasePage from '../basePage/BasePage';
export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage', page.locator('#userNavDropdown'));
        this.myProfileIcon = page.locator('#userNavDropdown');
        this.addCarButton = page.locator('app-garage .btn-primary');
        this.brandDropDownField = page.getByLabel('Brand');
        this.modelDropDownField = page.getByLabel('Model');
        this.mileageField = page.locator('#addCarMileage');
        this.editProfileButton = page.locator('.sidebar_btn.-profile');
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }

    async openProfilePage() {
        await this.editProfileButton.click();
    }
}
