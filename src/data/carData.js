import { CAR_BRANDS } from './cars';
import { CAR_MODELS } from './carModels';
import { faker } from '@faker-js/faker';

const carBrand = CAR_BRANDS.Audi;
const carModel = CAR_MODELS.Audi.A6;

const requestBody = {
    carBrandId: carBrand.id,
    carModelId: carModel.id,
    mileage: faker.number.int({ min: 1, max: 100 }),
};

const bodyInvalidRequest = {
    carBrandId: '',
    carModelId: 1,
    mileage: '@@@@',
};

const bodyValidResponse = {
    status: 'ok',
    data: {
        id: 184148,
        carBrandId: 1,
        carModelId: 1,
        initialMileage: 123,
        updatedMileageAt: '2024-08-12T08:47:33.498Z',
        carCreatedAt: '2024-08-12T08:47:33.498Z',
        mileage: 123,
        brand: 'Audi',
        model: 'TT',
        logo: 'audi.png',
    },
};

const badRequestError = {
    status: 'error',
    message: 'Invalid car brand type',
};

const routeOrEntityNotFoundRequestError = {
    status: 'error',
    message: 'Not found',
};

export {
    requestBody,
    bodyValidResponse,
    badRequestError,
    routeOrEntityNotFoundRequestError,
    bodyInvalidRequest,
    carBrand,
    carModel
};
