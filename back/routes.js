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
            handler: {
                file: {
                    path: '../front/_public/index.html'
                }
            }
        });

        this.server.route({
            method: 'GET',
            path: '/restaurants/all',
            handler: controllers.restaurants.getAll
        });

		this.server.route({
			method: 'GET',
			path: '/restaurants/load-daily-menus',
			handler: controllers.restaurants.loadDailyMenus
		});

        this.server.route({
            method: 'GET',
            path: '/restaurants/send-daily-menus/{channel?}',
            handler: controllers.restaurants.sendDailyMenus,
            config: {
                auth: 'simple'
            }
        });

        this.server.route({
            method: 'GET',
            path: '/auth',
            handler: controllers.auth.auth_with_slack
        });

        this.server.route({
            method: 'GET',
            path: '/callback',
            handler: controllers.auth.slack_callbackhandler
        });

        this.server.route({
            method: 'POST',
            path: '/users/{username}/update-favourite',
            handler: controllers.users.updateFavourite
        });

        this.server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '../front/_public'
                }
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
