import { expect, test } from '../../src/pageObject/fixtures/myFixtures.js';
import { CAR_BRANDS } from '../../src/data/cars.js';
import { CAR_MODELS } from '../../src/data/carModels.js';
import { USERS } from '../../src/data/users.js';

test.describe('Add a car', () => {
    test.afterEach(async ({ request }) => {
        const carsList = await request.get('/api/cars');
        const { data: cars } = await carsList.json();

        await Promise.all(
            cars.map(car =>
                (async () => {
                    const res = await request.delete(`/api/cars/${car.id}`);
                    await expect(res).toBeOK();
                })()
            )
        );

        // for (const car of cars) {
        //     const res = await request.delete(`/api/cars/${car.id}`)
        //     await expect(res).toBeOK()
        // }
    });

    // const carBrand = CAR_BRANDS.Audi;

    // for (const carModel of Object.values(CAR_MODELS.Audi)) {
    //     test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async ({
    //         request,
    //      }) => {
    //          // Arrange
    //          const requestBody = {
    //              carBrandId: carBrand.id,
    //          carModelId: carModel.id,
    //              mileage: Math.floor(Math.random() * 100),
    //          };
    //          // ACT
    //          const response = await request.post('/api/cars', {
    //              data: requestBody,
    //         });

    //         // Assert
    //         expect(response.status(), 'Status code should be valid').toBe(201);
    //         const actualBody = await response.json();
    //          expect(actualBody).toEqual({
    //              status: 'ok',
    //              data: {
    //                 id: expect.any(Number),
    //                  carBrandId: requestBody.carBrandId,
    //                 carModelId: requestBody.carModelId,
    //                 initialMileage: requestBody.mileage,
    //                 updatedMileageAt: expect.any(String),
    //                 carCreatedAt: expect.any(String),
    //                 mileage: requestBody.mileage,
    //                  brand: carBrand.title,
    //                model: carModel.title,
    //                  logo: carBrand.logoFilename,
    //             },
    //         });
    //      });
    // }

    for (const [brandKey, brand] of Object.entries(CAR_BRANDS)) {
        for (const model of Object.values(CAR_MODELS[brandKey])) {
            test(`Create car with brand ${brand.title} and model ${model.title}`, async ({
                request,
            }) => {
                // Arrange
                const requestBody = {
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: Math.floor(Math.random() * 100),
                };

                // Act
                const response = await request.post('/api/cars', {
                    data: requestBody,
                });

                // Assert
                expect(response.status(), 'Status code should be valid').toBe(
                    201
                );
                const actualBody = await response.json();
                expect(actualBody).toEqual({
                    status: 'ok',
                    data: {
                        id: expect.any(Number),
                        carBrandId: requestBody.carBrandId,
                        carModelId: requestBody.carModelId,
                        initialMileage: requestBody.mileage,
                        updatedMileageAt: expect.any(String),
                        carCreatedAt: expect.any(String),
                        mileage: requestBody.mileage,
                        brand: brand.title,
                        model: model.title,
                        logo: brand.logoFilename,
                    },
                });
            });
        }
    }
});

test.describe('Adding expenses to an existing car', async () => {
    let carID = null;

    test.afterEach(async ({ request }) => {
        const carsList = await request.get('/api/cars');
        const { data: cars } = await carsList.json();

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`);
            await expect(res).toBeOK();
            carID = null;
        }
    });

    test('Verifying ability to add car expenses to an existing car', async ({
        request,
    }) => {
        const carBrand = CAR_BRANDS.Audi;
        const carModelId = CAR_MODELS.Audi.A6;

        const requestBody = {
            carBrandId: carBrand.id,
            carModelId: carModelId.id,
            mileage: Math.floor(Math.random() * 100),
        };

        await request.post('/api/auth/signin', {
            data: {
                email: USERS.USER2.email,
                password: USERS.USER2.password,
                remember: false,
            },
        });

        const response = await request.post('api/cars', {
            data: requestBody,
        });
        const bodyCar = await response.json();
        expect(bodyCar.data, 'Car should be created').toMatchObject(
            requestBody
        );

        const expenseMileage = requestBody.mileage + 1;

        const requestBodyExpenses = {
            carId: bodyCar.data.id,
            reportedAt: "2024-08-18T00:00:00.000Z",
            mileage: expenseMileage,
            liters: 11,
            totalCost: Math.floor(Math.min(Math.random()) * 100, 10000)
        };

        const responseExpenses = await request.post('/api/expenses', {
            data: requestBodyExpenses,
        });

        const bodyExpenses = await responseExpenses.json();
        expect(bodyExpenses.data, 'Expenses should be created').toMatchObject(
            requestBodyExpenses
        );
    });
});
