"use strict";

var RestaurantController = require('./restaurantController');
var AuthController = require('./authController');

module.exports.restaurants = new RestaurantController();
module.exports.auth = new AuthController();
