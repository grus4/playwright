const bodyRequest = {
    carBrandId: 1,
    carModelId: 1,
    mileage: 123,
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
    bodyRequest,
    bodyValidResponse,
    badRequestError,
    routeOrEntityNotFoundRequestError,
    bodyInvalidRequest,
};
