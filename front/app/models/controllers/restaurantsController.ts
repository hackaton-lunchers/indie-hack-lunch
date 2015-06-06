/// <reference path='../services/restaurantAPI.ts' />

module demoApp {
    'use strict';

    export class RestaurantsController {

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$location',
            'Restaurants',
			'User',
			'$rootScope'
        ];

        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(private $scope:IDemoScope,
                    private $location:ng.ILocationService,
                    private Restaurants: Restaurants,
					private User: User,
					private $rootScope: IDemoRootScope
			) {
            this.Restaurants.query().then((result) => {
                $scope.restaurants = result.filter((item) => {
                    return item.title !== null;
                });
            });
        }

        addToFavourite(restaurantId: string) {
			this.User.addToFavourite(this.$rootScope.loggedUsername, restaurantId);
        }

    }

}