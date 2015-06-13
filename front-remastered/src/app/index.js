'use strict';

import RestaurantController from './restaurants/restaurant.controller';
import NavbarCtrl from '../app/components/navbar/navbar.controller';

import RestaurantService from './restaurants/restaurant.service';

angular.module('lunchers', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'])
  .service('RestaurantService', RestaurantService)
  .controller('RestaurantController', RestaurantController)
  .controller('NavbarCtrl', NavbarCtrl)

  .config(RestangularProvider => {
    RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
    RestangularProvider.setBaseUrl('http://localhost:8084/');
  })

  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html'
      })
      .state('restaurants', {
        url: '/',
        templateUrl: 'app/restaurants/restaurants.html',
        controller: 'RestaurantController as restaurant'
      });

    $urlRouterProvider.otherwise('/');
  })
;
