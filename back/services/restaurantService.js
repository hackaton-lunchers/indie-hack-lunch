"use strict";

var RestaurantRepository = require('../repositories/restaurantRepository');

class RestaurantService{
    constructor() {
        this._restaurantRepository = new RestaurantRepository();
    }

    getAll() {
        return this._restaurantRepository.getRestaurants();
    }

    loadDailyMenus() {

		let self = this;

		return new Promise(function(resolve, reject) {

			let dailyMenus = [];

			self._restaurantRepository.getRestaurants().then(function(restaurants) {
				restaurants.forEach(function(restaurant) {
					dailyMenus.push(self.loadMenu(restaurant.url));
				});

				resolve(dailyMenus);
			});
		});

    }

	loadMenu(menuUrl) {
		return menuUrl;
    }
}

module.exports = RestaurantService;
