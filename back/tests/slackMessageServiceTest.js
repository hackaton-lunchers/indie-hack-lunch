"use strict";

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var slackService = require("../services").slack;

var request = require('request');


describe('SlackService', function(){
	it('should exists', function(){
		expect(slackService).to.not.be.undefined;
	});


	it('sends message to slack', function(done) {
		slackService.sendMenu(null, null, done);
	});
});
