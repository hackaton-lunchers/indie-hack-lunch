"use strict";

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

class BaseRepository{
	constructor() {

		this._db = mongoose;

		this._db.connect('mongodb://localhost/eshop');
	}

	getObjectId() {
		return new ObjectID();
	}
}

module.exports = BaseRepository;
