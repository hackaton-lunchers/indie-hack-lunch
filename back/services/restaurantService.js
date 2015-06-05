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

			self._restaurantRepository.getRestaurants().then(function(restaurants) {
				restaurants.forEach(function(restaurant) {
					//console.log("url0");
					dailyMenus.push(self.loadMenu(restaurant.url));
				});

				resolve(dailyMenus);
			});
		});

    }

	loadMenu(menuUrl) {
		console.log("url: ", menuUrl);

		var menu = [];

		//[{"description":"bucek", "price":"120Kc"},{}]

		request.get({
				uri: menuUrl,
				encoding: null
			},
			function(err, resp, body_1250){
				var body_utf8 = iconv.decode(body_1250, 'win1250');
				var page = cheerio.load(body_utf8);
				var menicka = page('.menicka'); //use your CSS selector here
				page(menicka).find('div').each(function(i, elem){
					//console.log(page(menicka).text() + ':\n  ' + page(menicka).attr('href'));

					//if(!page(this).attr('class').includes("newrows")) {
					//	console.log('    i: ' + i + ' text:' + page(this).text() + ' class:' + page(this).attr('class'));
					//}

					if(page(this).attr('class').includes("nabidka_")){
						var price = '';
						if(page(this).next().hasClass('cena')){
							price = page(this).next().text()
						}
						var description = page(this).text();
						console.log('description: ' + description + '  price: ' +  price);

						menu.push({
							description: description,
							price: price
						});
					}
				});

				console.log('json:');
				console.log(menu);

				console.log("\n\n===============");
			}
		);


		return menu;
    }
}

module.exports = RestaurantService;
