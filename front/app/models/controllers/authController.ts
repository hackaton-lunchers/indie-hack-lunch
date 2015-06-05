/// <reference path='../services/authenticationAPI.ts' />
/// <reference path='demoscope.ts' />

module demoApp {
    'use strict';

    export class AuthController {

            // $inject annotation.
            // It provides $injector with information about dependencies to be injected into constructor
            // it is better to have it close to the constructor, because the parameters must match in count and type.
            // See http://docs.angularjs.org/guide/di
            public static $inject = [
                'Auth',
                '$scope'
            ];

            // dependencies are injected via AngularJS $injector
            // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
            constructor(private Auth: any, private $scope: IDemoScope) {
                this.$scope.user = {};
                console.log('Init');
            }

            login(username: string) {
                if(username) {
                    this.Auth.login(username);
                }
            }

            logout() {
                console.log('Test');
            }
        }

}
