"use strict";

var RestaurantRepository = require('../repositories/restaurantRepository');

class RestaurantService{
    constructor() {
        this._restaurantRepository = new RestaurantRepository();
    }

    getAll() {
        return this._restaurantRepository.getRestaurants();
    }
}

module.exports = RestaurantService;
