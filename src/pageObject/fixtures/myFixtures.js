import {
    test as customTest,
    expect as customExpect,
    request as apiRequest,
} from '@playwright/test';
import GaragePage from '../garagePage/GaragePage.js';
import { USER1_STORAGE_STATE_PATH } from '../../data/constants';
import HomePage from '../homePage/HomePage';
import ProfilePage from '../profilePage/ProfilePage.js';

export const test = customTest.extend({
    page: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH,
        });

        const customPage = await context.newPage();

        await use(customPage);

        await customPage.close();
    },

    request: async ({}, use) => {
        const requestCtx = await apiRequest.newContext({
            storageState: USER1_STORAGE_STATE_PATH,
        });

        await use(requestCtx);

        requestCtx.dispose();
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
