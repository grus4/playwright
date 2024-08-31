export default class CarsControllers {
    #CREATE_CARS_PATH = '/api/cars';
    #GET_CARS_PATH = '/api/cars';
    #GET_CARS_BRANDS_PATH = '/api/cars/brands';
    #GET_CARS_MODELS_PATH = '/api/cars/models';
    #DELETE_CAR_PATH = id => `/api/cars/${id}`;
    #UPDATE_CAR_PATH = id => `/api/cars/${id}`;
    #GET_CAR_BY_ID_PATH = id => `/api/cars/${id}`;
    #GET_CAR_MODEL_BY_ID_PATH = id => `/api/cars/models/${id}`;
    #GET_CAR_BRAND_BY_ID = id => `/api/cars/brands/${id}`;

    constructor(request) {
        this.request = request;
    }

    async getCars() {
        return this.request.get(this.#GET_CARS_PATH);
    }

    async getCarsBrands() {
        return this.request.get(this.#GET_CARS_BRANDS_PATH);
    }

    async getCarBrandById(id) {
        return this.request.get(this.#GET_CAR_BRAND_BY_ID(id));
    }

    async getCarsModels() {
        return this.request.get(this.#GET_CARS_MODELS_PATH);
    }

    async getCarModelById(id) {
        return this.request.get(this.#GET_CAR_MODEL_BY_ID_PATH(id));
    }

    async getCurrentUserCarById(id) {
        return this.request.get(this.#GET_CAR_BY_ID_PATH(id));
    }

    async createCar(requestBody) {
        return this.request.post(this.#CREATE_CARS_PATH, {
            data: requestBody,
        });
    }

    async editExistingCar(id, requestBody) {
        return this.request.put(this.#UPDATE_CAR_PATH(id), {
            data: requestBody,
        });
    }

    async deleteCarById(id) {
        return this.request.delete(this.#DELETE_CAR_PATH(id));
    }
}
