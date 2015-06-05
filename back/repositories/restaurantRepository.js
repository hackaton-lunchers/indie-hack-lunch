"use strict";

var BaseRepository = require('./baseRepository');


class RestaurantRepository extends BaseRepository{

	constructor() {

		super();
		this._Restaurant = this._db.model('Restaurant', { title: String, url: String });
	}

	getRestaurants() {
		return this._Restaurant.find().exec();
	}
}

module.exports = RestaurantRepository;
