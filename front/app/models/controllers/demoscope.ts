/// <reference path='../../typings/angular/angular.d.ts' />

module demoApp {
    export interface IDemoScope extends ng.IScope {
        restaurants: any[]
        username: string
    }
}