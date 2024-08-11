import BasePage from '../basePage/BasePage';

export default class ProfilePage extends BasePage {
    constructor(page) {
        super(
            page,
            '/panel/profile',
            page.getByRole('button', { name: 'Edit profile' })
        );

        this.editProfileButton = page.getByRole('button', {
            name: 'Edit profile'
        });
    }
}
