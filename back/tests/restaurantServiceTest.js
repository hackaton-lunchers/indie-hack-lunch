"use strict";

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var restaurantService = require("../services").restaurants;

describe('RestaurantService', function(){
	it('should exists', function(){
		expect(restaurantService).to.not.be.undefined;
	});

	
});
