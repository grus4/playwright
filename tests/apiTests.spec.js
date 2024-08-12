import { test, expect } from '../src/pageObject/fixtures/myFixtures.js';

import {
    bodyRequest,
    routeOrEntityNotFoundRequestError,
    badRequestError,
    bodyInvalidRequest,
} from '../src/data/carData.js';

test.describe('Add a car', async () => {
    //let carId = null;
    test.afterEach(async ({ request }) => {
        const carList = await request.get('/api/cars');
        const { data: cars } = await carList.json();

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`);
            await expect(res).toBeOK();
        }
        // if (carId) {
        //     const res = await request.delete(`/api/cars/${carId}`);
        //     await expect(res).toBeOK();
        //     carId = null;
        // }
    });

    test('Create a car with valid data @api', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: bodyRequest,
        });

        const body = await response.json();

        expect(body.data, 'The car was created @api').toMatchObject(
            bodyRequest
        );
        expect(response).toBeOK;
        //carId = body.data.id;
    });

    test('Create a car with invalid data in the request @api', async ({
        request,
    }) => {
        const response = await request.post('/api/cars', {
            data: bodyInvalidRequest,
        });

        const body = await response.json();

        expect(body.status).toBe(badRequestError.status);
        expect(body.message).toBe(badRequestError.message);
    });

    test('Create car with an invalid entity', async ({
        request,
    }) => {
        const response = await request.post('/api/cardss', {
            data: bodyRequest,
        });

        const body = await response.json();

        expect(body.status).toBe(routeOrEntityNotFoundRequestError.status);
        expect(body.message).toBe(routeOrEntityNotFoundRequestError.message);
    });
});
