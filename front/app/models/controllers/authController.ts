/// <reference path='../services/authenticationAPI.ts' />

module demoApp {
    'use strict';

    export class AuthController {

            // $inject annotation.
            // It provides $injector with information about dependencies to be injected into constructor
            // it is better to have it close to the constructor, because the parameters must match in count and type.
            // See http://docs.angularjs.org/guide/di
            public static $inject = [
                'Auth'
            ];

            // dependencies are injected via AngularJS $injector
            // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
            constructor(private Auth:any) {

            }

            login(credentials: any) {
                this.Auth.login(credentials);
            }

            logout() {
                this.Auth.logout();
            }
        }

}