/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class Restaurants {

       public static $inject = [
         'Restangular'
       ];

       constructor(
         private Restangular: restangular.IService
       ) {
       }

       query() {
           this.Restangular
               .all('menu')
               .getList();
       }

    }

}