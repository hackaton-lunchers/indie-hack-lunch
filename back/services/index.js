"use strict"

var RestaurantService = require('./restaurantService');
var UserService = require('./userService');
var AuthenticationService = require('./authenticationService');
var SlackMessageService = require('./slackMessageService');

module.exports.restaurants = new RestaurantService();
module.exports.users = new UserService();
module.exports.authentication = new AuthenticationService();
module.exports.slack = new SlackMessageService();
