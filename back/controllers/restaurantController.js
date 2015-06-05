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

    loadDailyMenus(request, reply) {
        services.restaurants.loadDailyMenus().then(function(dailyMenus){
            reply(dailyMenus);
        });
    }
}

module.exports = RestaurantController;
