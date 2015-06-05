"use strict"

var RestaurantService = require('./restaurantService');
var UserService = require('./userService');
var AuthenticationService = require('./authenticationService');

module.exports.restaurants = new RestaurantService();
module.exports.users = new UserService();
module.exports.authentication = new AuthenticationService();
