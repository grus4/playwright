import { expect, test } from '../../src/pageObject/fixtures/myFixtures.js';
import { CAR_BRANDS } from '../../src/data/cars.js';
import { CAR_MODELS } from '../../src/data/carModels.js';
import { requestBody, carBrand, carModel } from '../../src/data/carData.js';

test.describe('Create car using controllers', () => {
 
    test('Creating a new car successfully', async ({ carsController }) => {
        const response = await carsController.createCar(requestBody);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('id');
        expect(responseBody.data.carBrandId).toBe(carBrand.id);
        expect(responseBody.data.carModelId).toBe(carModel.id);
    });

    test('Retrieve the list of cars', async ({ carsController }) => {
        const response = await carsController.getCars();
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    test('Retrieve the list of brands', async ({ carsController }) => {
        const response = await carsController.getCarsBrands();
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    test('Retrieve the list of models', async ({ carsController }) => {
        const response = await carsController.getCarsModels();
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    test('Retrieve the car brand by id', async ({ carsController }) => {
        const response = await carsController.getCarBrandById(carBrand.id);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Retrieve the car model by id', async ({ carsController }) => {
        const response = await carsController.getCarModelById(carModel.id);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        console.log(responseBody);
    });
});
