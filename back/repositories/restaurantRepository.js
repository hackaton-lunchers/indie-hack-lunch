"use strict";

var BaseRepository = require('./baseRepository');


class RestaurantRepository extends BaseRepository{

	constructor() {

		super();
		this._Restaurant = this._db.model('Restaurant', { title: String, url: String, dailyMenu: [this._db.Schema.Types.Mixed] });
	}

	getRestaurants() {
		return this._Restaurant.find().exec();
	}

	updateRestaurant(restaurant) {

		var self = this;

		return new Promise(function(resolve, reject) {
			self._Restaurant.update(
				{ title: restaurant.title },
				restaurant,
				{ upsert: true }, function(err, numAffected) {

					if (!err) {
						resolve(numAffected);
					} else {
						reject();
					}

				}
			);
		});

	}
}

module.exports = RestaurantRepository;
