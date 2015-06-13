'use strict';

describe('Restaurant service', function(){
  var restaurantService;
  var httpBackend;

  beforeEach(module('lunchers'));

  beforeEach(inject(function(RestaurantService, $httpBackend) {
    restaurantService = RestaurantService;
    httpBackend = $httpBackend;
  }));

  it('should GET all restaurants', function(){
    httpBackend.expectGET('http://localhost:8084/restaurants/all').respond(200,[]);

    restaurantService.get();

    httpBackend.flush();
  }); 
});