'use strict';

class RestaurantController {
  constructor(RestaurantService) {
    this.RestaurantService = RestaurantService;
    this.init();
  }

  getRestaurants() {
    var self = this;

    this.RestaurantService.get().then(function(result){
      self.restaurants = result;
    });
  }

  init() {
    this.getRestaurants();
  }

}

RestaurantController.$inject = ['RestaurantService'];

export default RestaurantController;