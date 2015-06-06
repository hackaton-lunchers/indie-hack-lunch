"use strict";

var BaseRepository = require('./baseRepository');


class RestaurantRepository extends BaseRepository{

	constructor() {

		super();
		this._Restaurant = this._db.model('Restaurant', { _id: this._db.Schema.Types.ObjectId, title: String, url: String, menu: [this._db.Schema.Types.Mixed], users: [String] });
	}

	getRestaurants() {
		return this._Restaurant.find().exec();
	}

	getRestaurant(restaurantId) {
		return this._Restaurant.findOne({_id: restaurantId}).exec();
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

	updateRestaurantPreference(restaurantId, userNames) {

		var self = this;

		return new Promise(function(resolve, reject) {
			self._Restaurant.update(
				{ _id: restaurantId },
				{ users: userNames },
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
