"use strict";

var BaseRepository = require('./baseRepository');


class CategoryRepository extends BaseRepository{

	constructor() {

		super();
		this._Category = this._db.model('Category', { id: Number, title: String });
	}

	insertCategory(category) {

		var dbCategory = new this._Category(category);
		dbCategory._id = this.getObjectId();

		return dbCategory.save();
	}

	getCategoryList() {
		return this._Category.find().exec();
	}
}

module.exports = CategoryRepository;
