'use strict';

var BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {

	constructor() {

		super();
		this._User = this._db.model('User', { userName: String, restaurants: [this._db.Schema.Types.ObjectId] });
	}

	getUsers() {
		return this._User.find().exec();
	}

	updateRestaurantPreference(userName, restaurantIds) {

		var self = this;

		return new Promise(function(resolve, reject) {
			self._User.update(
				{ userName: userName },
				{ restaurants: restaurantId},
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

module.exports = UserRepository;