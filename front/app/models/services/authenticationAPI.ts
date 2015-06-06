/// <reference path='../../typings/restangular/restangular.d.ts' />
/// <reference path='../../typings/angular-ui-router/angular-ui-router.d.ts' />

module demoApp {
    'use strict';

    export class Auth {

        public static $inject = [
            'Restangular',
            '$rootScope',
            '$state'
        ];

        constructor(
            private Restangular: restangular.IService,
            private $rootScope: IDemoRootScope,
            private $state: angular.ui.IStateService
        ) {
        }

        login(username: string) {

            this.$rootScope.loggedUsername = username;
            //this.Restangular.all('login').customPOST(username);

            this.$state.go('list');
        }

        register() {
            console.log('Registration');
        }

        logout() {
            console.log('Logout');
        }
    }
}
