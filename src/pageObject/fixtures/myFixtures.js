import {
    test as customTest,
    expect as customExpect,
    request as apiRequest,
    request,
} from '@playwright/test';
import GaragePage from '../garagePage/GaragePage.js';
import { USER1_STORAGE_STATE_PATH } from '../../data/constants';
import HomePage from '../homePage/HomePage';
import ProfilePage from '../profilePage/profilePage.js';
import CarsControllers from '../../controllers/CarsController';
import { CAR_BRANDS } from '../../data/cars';
import { CAR_MODELS } from '../../data/carModels';
import { faker } from '@faker-js/faker';

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

    carsController: async ({ request }, use) => {
        const carsController = new CarsControllers(request);
        await use(carsController);
    },

    createCar: async ({ request, carsController }, use) => {
        const carBrand = CAR_BRANDS.Audi;
        const carModel = CAR_MODELS.Audi.A6;

        const requestBody = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
            mileage: faker.number.int({ min: 1, max: 100 }),
        };

        const response = await carsController.createCar(requestBody);
        const body = await response.json();

        use(body.data);

        await request.delete(`/api/cars/${id}`);
    },
});

export const expect = customExpect;
