"use strict";

var RestaurantRepository = require('../repositories/restaurantRepository');
var SlackMessageService = require('./slackMessageService');

var request = require('request')
	, cheerio = require('cheerio');
var iconv = require('iconv-lite');


class RestaurantService{
    constructor() {
        this._restaurantRepository = new RestaurantRepository();
        this._slackMessageService = new SlackMessageService();
    }

    getAll() {
        return this._restaurantRepository.getRestaurants();
    }

    loadDailyMenus() {

		let self = this;

		return new Promise(function(resolve, reject) {

			let dailyMenus = [];
			let restaurantPromisses = [];

			self._restaurantRepository.getRestaurants().then(function(restaurants) {

				restaurants.forEach(function(restaurant) {

					restaurantPromisses.push(new Promise(function(resolve2, reject2) {
						var loadMenuPromise = self.loadMenu(restaurant.url, self);

						loadMenuPromise.then(function(dailyMenu) {
							restaurant.menu = dailyMenu;

							dailyMenus.push(restaurant);
							var updatePromise = self._restaurantRepository.updateRestaurant({title: restaurant.title, menu: dailyMenu});

							updatePromise.then(function () {
								resolve2();
							})
						});
					}));

				});

				Promise.all(restaurantPromisses).then(function() {
					resolve(dailyMenus);
				});

			});
		});

    }

    parserMenickaCZ(resolve, reject, err, resp, body_1250){
        var menu = [];
        //[{"title":"bucek", "description":"nejlepsi chuti", "price":"120Kc", "type": "soup"},{}]
        var body_utf8 = iconv.decode(body_1250, 'win1250');
        var page = cheerio.load(body_utf8);
        var menicka = page('.menicka'); //use your CSS selector here

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var date = dd+'.'+mm+'.'+yyyy;
        //console.log('date: ' + date);

        page(menicka).find('div .datum').each(function (i, elem) {
            if(page(this).text().includes(date)){
                console.log('menu for date ' + date);

                var dnesni_menu = page(this).parent()
                dnesni_menu.find('div').each(function (i, elem) {

                    //if(!page(this).attr('class').includes("newrows")) {
                    //    console.log('    i: ' + i + ' text:' + page(this).text() + ' class:' + page(this).attr('class'));
                    //}

                    if (page(this).attr('class').includes("nabidka_")) {
                        var price = '';
                        if (page(this).next().hasClass('cena')) {
                            price = page(this).next().text()
                        }
                        var title = String(page(this).text()).replace('\t','');
                        var description = '';
                        if(title.includes("-") || title.includes("–") || title.includes("/")){
                            var parts = title.split(/[-–/]+/)
                            //console.log('0:' + parts[0] + '  1:' + parts[1]);
                            if(parts.length == 2){
                                title = parts[0];
                                description = parts[1];
                            }
                            if(parts.length == 3){
                                title = parts[0]+'-'+parts[1]; //Kuře bang-bang
                                description = parts[2];
                            }
                            //console.log('    i: ' + i + ' text:' + page(this).text() + ' class:' + page(this).attr('class'));
                        }
                        var type = '';
                        if(page(this).attr('class').includes("capitalize")) {
                            type = 'soup';
                        }
                        console.log('title: ' + title + '  description: ' + description +'  price: ' + price + '  type: ' + type);

                        menu.push({
                            title: title,
                            description: description,
                            price: price,
                            type: type
                        });
                    }
                });

            }
        });

        //console.log('json:');
        //console.log(menu);
        console.log("===============");
        resolve(menu);
    }

	loadMenu(menuUrl, self) {
		return new Promise(function(resolve, reject) {
			request.get({
					uri: menuUrl,
					encoding: null
				},
				function (err, resp, body) {
                    console.log("menuUrl: " + menuUrl);
                    if(menuUrl.includes("menicka.cz")){
                        self.parserMenickaCZ(resolve, reject, err, resp, body);
                    }

				}
			);

		});
    }

    sendMenu(channel) {

    	var self = this

    	this.getAll().then(function (restaurants) {

    		restaurants.forEach(function(m) {
    			self._slackMessageService.sendMenu(m, channel, function(){})
    		})
    	})		
    }
}

module.exports = RestaurantService;
