/// <reference path='../../typings/restangular/restangular.d.ts' />

module demoApp {
    'use strict';

    export class Auth {

        constructor(
            private Restangular: restangular.IService
        ) {
        }

        login() {
            console.log('Login');
        }

        register() {
            console.log('Registration');
        }

        logout() {
            console.log('Logout');
        }

    }

}
