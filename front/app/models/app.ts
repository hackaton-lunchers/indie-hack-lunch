/// <reference path='../typings/angular/angular.d.ts' />
/// <reference path='../typings/restangular/restangular.d.ts' />
/// <reference path='./controllers/restaurantsController.ts' />
/// <reference path='./services/restaurantAPI.ts' />

module demoApp {
    'use strict';

    angular
        .module('demo-app', ['restangular'])
        .config(['RestangularProvider', (restangularProvider: restangular.IProvider) => {
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
            restangularProvider.setBaseUrl('http://private-0c8c5-indiehackapi.apiary-mock.com/api/');
        }])
        .service('Restaurants', Restaurants)
        .service('Auth', Auth)
        .controller('RestaurantsController', RestaurantsController);
}