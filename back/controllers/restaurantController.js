"use strict"

var services = require('../services');

class RestaurantController{
    constructor() {
    }

    getAll(request, reply) {
        services.restaurants.getAll().then(function(restaurants){
            reply(restaurants);
        });
    }

    loadDailyMenus(request, reply) {
        services.restaurants.loadDailyMenus().then(function(dailyMenus){
            reply(dailyMenus);
        });
    }

    sendDailyMenus(request, reply) {

        //#lunch
        var channels = [];

        if (request.params.channel) {
            channels.push(request.params.channel);
        }

        services.restaurants.sendMenu(channels).then(function(){
            reply({status: "send"});
        });
    }
}

module.exports = RestaurantController;
