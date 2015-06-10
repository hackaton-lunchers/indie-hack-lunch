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

    parserMenickaCZ(resolve, reject, err, resp, body_1250, menuUrl){
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

                        var type = '';
                        if(page(this).attr('class').includes("capitalize")) {
                            type = 'soup';
                        }

                        var title = String(page(this).text()).replace('\t','');

                        if(menuUrl.includes("u-dzberu") || menuUrl.includes("the-pub") || menuUrl.includes("vaclavka")){
                            //console.log('    ' + title);
                            var pos = title.indexOf("\A-");
                            if(pos == -1){
                                pos = title.indexOf("(A");
                            }
                            if(menuUrl.includes("vaclavka")){
                                pos = title.indexOf('(');
                            }
                            if(pos>-1){
                                title = title.substring(0, pos-1); //remove alergens e.g. "/A-1,3,7"
                                //console.log('    ' + title);
                            }
                        }

                        var description = '';
                        if(type != 'soup'){  //Uzená s kroupami / Čočková s klobásou
                            if(title.includes("-") || title.includes("–") || title.includes("/")){
                                var parts = title.split(/[-–/]+/)
                                //console.log('0:' + parts[0] + '  1:' + parts[1]);
                                if(parts.length == 2 && !menuUrl.includes("the-pub")){
                                    title = parts[0];
                                    description = parts[1];
                                }
                                if(parts.length == 3){
                                    title = parts[0]+'-'+parts[1]; //Kuře bang-bang
                                    description = parts[2];
                                }
                                //console.log('    i: ' + i + ' text:' + page(this).text() + ' class:' + page(this).attr('class'));
                            }
                        }

                        if(menuUrl.includes("vaclavka")){
                            if(title.includes('Polévka:') || title.includes('Hlavní jídla:') || title.includes('AKCE, RAUTY, VEČÍRKY') || title.includes('Uspořádáme večírek')){
                                return true; //continue;
                            }
                        }
                        if(menuUrl.includes("na-blbym-miste")){
                            if(title.includes('Kompletní menu:') || title.includes('Vegetariánská nabídka:') || title.includes('Dezert:')){
                                return true; //continue;
                            }
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
                        self.parserMenickaCZ(resolve, reject, err, resp, body, menuUrl);
                    }

				}
			);

		});
    }

    sendMenu(channels) {

        var self = this;

        var menuPromises = [];

        return new Promise(function(resolve, reject) {

            self.getAll().then(function (restaurants) {

                restaurants.forEach(function (m) {
                    menuPromises.push(self._slackMessageService.sendMenu(m, channels))
                });

                Promise.all(menuPromises).then(function() {
                    resolve();
                })
            });
        });
    }

    updateUserPreferences(username, restaurantId) {

        var self = this;

        return new Promise(function(resolve, reject) {
            self._restaurantRepository.getRestaurant(restaurantId).then(function (restaurant) {

				if (!restaurant.users) {
					restaurant.users = [];
				}

                if (restaurant.users.indexOf(username) < 0) {

                    var newUsers = restaurant.users;
                    newUsers.push(username);

                    self._restaurantRepository.updateRestaurantPreference(restaurantId, newUsers).then(function() {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });

    }
}

module.exports = RestaurantService;
