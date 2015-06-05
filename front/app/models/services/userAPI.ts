/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class User {

        constructor(
            private Restangular: restangular.IService
            ) {
        }
    }

}