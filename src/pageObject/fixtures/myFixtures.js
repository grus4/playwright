import { test as customTest, expect as customExpect } from '@playwright/test';
import GaragePage from '../garagePage/GaragePage';
import { USER1_STORAGE_STATE_PATH } from '../../data/constants';
import HomePage from '../homePage/HomePage';
import ProfilePage from '../profilePage/profilePage';

export const test = customTest.extend({
    page: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH,
        });

        const customPage = await context.newPage();

        await use(customPage);

        await customPage.close();
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        use(homePage);
    },

    garagePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        use(garagePage);
    },

    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        use(profilePage);
    },
});

export const expect = customExpect;
