"use strict"

var Joi = require('joi');
var controllers = require('./controllers');

class Routes{
    constructor(server) {
        this.server = server;
    }

    install() {
        this.server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply('Welcome ecma6 eshop. At "/docs" you can explore all the available endpoints. For authentication use username/password: john/secret');
            }
        });

        this.server.route({
            method: 'GET',
            path: '/restaurants/all',
            handler: controllers.restaurants.getAll,
            config: {
                auth: 'simple'
            }
        });
    }
}

/* not used
let validateId = {
    query: {
        id: Joi.number().integer().min(1)
    }
} */

module.exports = Routes;
