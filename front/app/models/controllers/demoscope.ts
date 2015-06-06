/// <reference path='../../typings/angular/angular.d.ts' />

module demoApp {
    export interface IDemoScope extends ng.IScope {
        restaurants: any[]
        user: any
        username: string
    }

    export interface IDemoRootScope extends ng.IRootScopeService {
        loggedUsername: string
    }
}