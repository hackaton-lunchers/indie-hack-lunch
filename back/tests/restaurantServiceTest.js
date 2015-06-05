"use strict";

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var restaurantService = require("../services").restaurants;

var request = require('request');


describe('RestaurantService', function(){
	it('should exists', function(){
		expect(restaurantService).to.not.be.undefined;
	});


	it('makes http post request', function() {
		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url:     'http://localhost/test2.php',
			body:    "mes=heydude"
		}, function(error, response, body){
			console.log(body);
		});
	});
});
