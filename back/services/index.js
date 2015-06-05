"use strict"

var CategoryService = require('./categoryService');
var ProductService = require('./productService');
var UserService = require('./userService');
var AuthenticationService = require('./authenticationService');

module.exports.categories = new CategoryService();
module.exports.products = new ProductService();
module.exports.users = new UserService();
module.exports.authentication = new AuthenticationService();
