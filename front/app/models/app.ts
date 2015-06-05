/// <reference path='../typings/angular/angular.d.ts' />
/// <reference path='../typings/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../typings/restangular/restangular.d.ts' />
/// <reference path='./controllers/restaurantsController.ts' />
/// <reference path='./controllers/authController.ts' />
/// <reference path='./services/restaurantAPI.ts' />
/// <reference path='./services/authenticationAPI.ts' />

module demoApp {
    'use strict';

    angular
        .module('demo-app', ['restangular', 'ui.router'])
        .config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) => {
            $urlRouterProvider.otherwise('/list');

            $stateProvider.state('list', {
                url: '/list',
                templateUrl: 'templates/listofall.html',
                controller: 'RestaurantsController'
            }).state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'AuthController'
            })
        })
        .config(['RestangularProvider', (restangularProvider: restangular.IProvider) => {
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
            restangularProvider.setBaseUrl('http://localhost:8084/');
        }])
        .service('Restaurants', Restaurants)
        .service('Auth', Auth)
        .controller('RestaurantsController', RestaurantsController)
        .controller('AuthController', AuthController);
}