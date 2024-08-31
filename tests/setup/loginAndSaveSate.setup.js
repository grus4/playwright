import { expect, test as setup } from '@playwright/test';
import { USER1_STORAGE_STATE_PATH } from '../../src/data/constants.js';
import { USERS } from '../../src/data/users.js';

setup(
    `Login as ${USERS.USER1.email} and save storage state`,
    async ({ request }) => {
        // const homePage = new HomePage(page);
        // await homePage.navigateToPage();
        // const loginModal = await homePage.header.openSignInForm();
        // await loginModal.login({
        //     email: USERS.USER1.email,
        //     password: USERS.USER1.password,
        // });
        // const garagePage = new GaragePage(page);
        // await expect(garagePage.myProfileIcon).toBeVisible();

        // await page.context().storageState({
        //     path: USER1_STORAGE_STATE_PATH,
        // });

        await request.post('/api/auth/signin', {
            data: {
                email: USERS.USER1.email,
                password: USERS.USER1.password,
                remember: false,
            },
        });

        await request.storageState({
            path: USER1_STORAGE_STATE_PATH,
        });
    }
);

