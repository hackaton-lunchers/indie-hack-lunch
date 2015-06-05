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
            path: '/categories/all',
            handler: controllers.categories.getAll,
            config: {
                auth: 'simple'
            }
        });

        this.server.route({
            method: 'GET',
            path: '/categories/insert',
            handler: controllers.categories.insert,
            config: {
                auth: 'simple'
            }
        });

        this.server.route({
            method: 'GET',
            path: '/products/bycategory',
            handler: controllers.products.getByCategory,
            config: {
                auth: 'simple',
                validate: validateId
            }
        });

        this.server.route({
            method: 'GET',
            path: '/products/detail',
            handler: controllers.products.getDetail,
            config: {
                auth: 'simple',
                validate: validateId
            }
        });
    }
}

let validateId = {
    query: {
        id: Joi.number().integer().min(1)
    }
}

module.exports = Routes;
