"use strict";

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

class BaseRepository{
	constructor() {

		this._db = mongoose;

		this._db.connect('mongodb://admin:lunchers123@ds043262.mongolab.com:43262/lunchers');
	}

	getObjectId() {
		return new ObjectID();
	}
}

module.exports = BaseRepository;
