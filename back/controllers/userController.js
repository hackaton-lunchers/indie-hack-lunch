"use strict";

var services = require('../services');

class UserController{
    constructor() {
    }

    updateFavourite(request, reply) {
        services.restaurants.updateUserPreferences(request.params.username, request.payload.id).then(function() {
            reply().code(201);
        });
    }
}

module.exports = UserController;
