"use strict";

var RestaurantController = require('./restaurantController');
var AuthController = require('./authController');
var UserController = require('./userController');

module.exports.restaurants = new RestaurantController();
module.exports.auth = new AuthController();
module.exports.users = new UserController();
