import { test, expect } from '../src/pageObject/fixtures/myFixtures';
import { mockedProfileData } from '../src/data/profileData.js';

const mockedProfile = {
    status: 'ok',
    data: {
        userId: 131359,
        photoFilename: 'default-user.png',
        name: 'Fedor',
        lastName: 'Dared',
    },
};

test.describe('Profile request interception', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigateToPage();
    });

    test('Profile request interception', async ({ garagePage, page }) => {
        await page.route('/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                json: mockedProfileData,
            });
        });
        await garagePage.openProfilePage();
    });
});
