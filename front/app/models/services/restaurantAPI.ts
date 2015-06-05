/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class Restaurants {

       constructor(
         private Restangular: restangular.IService
       ) {
       }

       query() {
           return this.Restangular
               .all('restaurants/all')
               .getList();
       }

    }

}