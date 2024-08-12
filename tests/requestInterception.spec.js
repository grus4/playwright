import { test, expect } from '../src/pageObject/fixtures/myFixtures';
import { mockedProfileData } from '../src/data/profileData.js';

test.describe('Profile request interception @api', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigateToPage();
    });

    test('Profile request interception', async ({
        profilePage,
        page,
    }) => {
        await page.route('/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                json: mockedProfileData,
            });
        });
        await profilePage.navigateToPage();
        await expect(profilePage.profileName).toHaveText(
            `${mockedProfileData.data.name} ${mockedProfileData.data.lastName}`
        );
    });
});
