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

		var menus = [
                {
                    "rest_id": 1,
                    "title": "Halong Bay",
                    "slug": "halong-bay",
                    "menu": [
                        {
                            "title": "Menu 1",
                            "price": "110 Kč",
                            "type": ""
                        },
                        {
                            "title": "Menu 2",
                            "price": "120 Kč",
                            "type": ""
                        },
                        {
                            "title": "Menu 3",
                            "price": "80 Kč",
                            "type": ""
                        },
                        {
                            "title": "Pálivá polévka",
                            "price": "20 Kč",
                            "type": "soup"
                        }
                    ]
                },
                {
                    "rest_id": 2,
                    "title": "Jiná Krajina",
                    "slug": "jina-krajina",
                    "menu": [
                        {
                            "title": "Steak z Tuňáka",
                            "price": "130 Kč",
                            "type": ""
                        },
                        {
                            "title": "Cheeseburger a domácí hranolky",
                            "price": "120 Kč",
                            "type": ""
                        },
                        {
                            "title": "Vegetariánské Burritos",
                            "price": "115 Kč",
                            "type": ""
                        },
                        {
                            "title": "Hovězí tatarák",
                            "price": "140 Kč",
                            "type": ""
                        }
                    ]
                },
                {
                    "rest_id": 3,
                    "title": "The Pub",
                    "slug": "the-pub",
                    "menu": [
                        {
                            "title": "Steak z Tuňáka",
                            "price": "130 Kč",
                            "type": ""
                        },
                        {
                            "title": "Chicken Caesar salát",
                            "price": "90 Kč",
                            "type": ""
                        },
                        {
                            "title": "Plněné bramborové knedlíky uzeným masem",
                            "price": "115 Kč",
                            "type": ""
                        },
                        {
                            "title": "Hovězí tatarák",
                            "price": "140 Kč",
                            "type": ""
                        }
                    ]
                }
            ]

		menus.forEach(function(menu) {			
			slackService.sendMenu(menu, "@tomas_milata", done);
		});

	});

	it('sends message to slack ', function(done) {
		slackService.sendUserIsGoingTo("tomas_milata", "El Pueblo", "#lunch-slackbot-test", done)
	});
});
