import { url } from 'inspector';
import { test, expect } from '../src/pageObject/fixtures/myFixtures';

test.describe('Login', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigateToPage();
    });

    test('Login to account', async ({ garagePage }) => {
        await expect(garagePage.myProfileIcon).toBeVisible();
    });

});
