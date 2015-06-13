'use strict';

class RestaurantService {
  constructor(Restangular) {
    this.Restangular = Restangular;
  }

  get() {
    return this.Restangular.all('restaurants/all').getList();
  }
}

RestaurantService.$inject = ['Restangular'];

export default RestaurantService;