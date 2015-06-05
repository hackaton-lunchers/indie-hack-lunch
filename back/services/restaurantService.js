"use strict";

var RestaurantRepository = require('../repositories/restaurantRepository');

var request = require('request')
	, cheerio = require('cheerio');
var iconv = require('iconv-lite');


class RestaurantService{
    constructor() {
        this._restaurantRepository = new RestaurantRepository();
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

					restaurantPromisses.push(new Promise(function(resolve, reject) {
						var loadMenuPromise = self.loadMenu(restaurant.url);

						loadMenuPromise.then(function(dailyMenu) {
							restaurant.menu = dailyMenu;

							dailyMenus.push(restaurant);
							var updatePromise = self._restaurantRepository.updateRestaurant({title: restaurant.title, menu: dailyMenu});

							updatePromise.then(function () {
								resolve();
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

	loadMenu(menuUrl) {

		return new Promise(function(resolve, reject) {

			var menu = [];

            //[{"title":"bucek", "price":"120Kc", "type": "soup"},{}]

			request.get({
					uri: menuUrl,
					encoding: null
				},
				function (err, resp, body_1250) {
                    console.log("menuUrl: " + menuUrl);
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
                                    var type = '';
                                    if(page(this).attr('class').includes("capitalize")) {
                                        type = 'soup';
                                    }
                                    console.log('title: ' + title + '  price: ' + price + '  type: ' + type);

                                    menu.push({
                                        title: title,
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
			);

		});
    }

	sendMenu() {
		console.log('menu send')
	}
}

module.exports = RestaurantService;
