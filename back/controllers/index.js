"use strict"

var CategoryController = require('./categoryController');
var ProductController = require('./productController');

module.exports.categories = new CategoryController();
module.exports.products = new ProductController();
