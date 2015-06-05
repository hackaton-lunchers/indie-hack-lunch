/// <reference path='../typings/angular/angular.d.ts' />
/// <reference path='../typings/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../typings/restangular/restangular.d.ts' />
/// <reference path='./controllers/restaurantsController.ts' />
/// <reference path='./services/restaurantAPI.ts' />
/// <reference path='./services/authenticationAPI.ts' />

module demoApp {
    'use strict';

    angular
        .module('demo-app', ['restangular', 'ui.router'])
        .config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) => {
            $urlRouterProvider.otherwise('/home');

            $stateProvider.state('home', {
                url: '/home',
                template: '<b>Home</b>'
            }).state('test', {
                url: '/test',
                templateUrl: 'template/demo.html',
                controller: 'TechnologyController'
            })
        })
        .config(['RestangularProvider', (restangularProvider: restangular.IProvider) => {
            restangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
            restangularProvider.setBaseUrl('http://private-0c8c5-indiehackapi.apiary-mock.com/api/');
        }])
        .service('Restaurants', Restaurants)
        .service('Auth', Auth)
        .controller('RestaurantsController', RestaurantsController);
}