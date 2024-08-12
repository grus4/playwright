import { test, expect } from '../src/pageObject/fixtures/myFixtures';
import { mockedProfileData } from '../src/data/profileData.js';
import { USERS } from '../src/data/users.js';

test.describe('Profile request interception', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigateToPage();
    });

    test.only('Profile request interception', async ({
        garagePage,
        profilePage,
        page,
    }) => {
        await page.route('/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                json: mockedProfileData,
            });
        });
        await garagePage.openProfilePage();
        await expect(profilePage.profileName).not.toHaveText(
            `${USERS.USER1.firstName} ${USERS.USER1.lastName}`
        );
        await expect(profilePage.profileName).toHaveText(
            `${mockedProfileData.data.name} ${mockedProfileData.data.lastName}`
        );
    });
});
