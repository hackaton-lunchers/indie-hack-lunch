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


}

module.exports = UserRepository;