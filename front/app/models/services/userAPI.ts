/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class User {

        constructor(
            private Restangular: restangular.IService
            ) {
        }

        addToFavourite(username: string, restaurantId: string) {
            return this.Restangular
                .one('users', username)
                .customPOST({id: restaurantId}, 'update-favourite');
        }
    }

}