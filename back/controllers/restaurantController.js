"use strict"

var services = require('../services');

class RestaurantController{
    constructor() {
    }

    getAll(request, reply) {
        services.restaurants.getAll().then(function(restaurants){
            reply(restaurants);
        });
    }
}

module.exports = RestaurantController;
