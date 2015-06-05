"use strict"

var request = require('request');




class SlackMessageService {

	//@username
	//+channel
	sendMenu(menu, channel, done) {

		var payload = {

			"channel": channel, 
			"username": "Lunch Menu",
			"text": menu.title + " <https://url.com/|Im going>", 
			"icon_emoji": ":spaghetti:",

			"attachments": [
			{
				"fallback": "",
				"fields": new Array()
			}
			]
		};

		return new Promise(function(resolve, reject) {

			menu.menu.forEach(function (m) {
				var type = "";
				if (m.type) {
					type = "[" + m.type + "] "
				}
				payload.attachments[0].fields.push(
					{
						"title": type + m.title,
						"value": m.price + " <https://url.com/|Like> <https://url.com/|Dislike>"
					}
				)
			});


			request.post({
				url: 'https://hooks.slack.com/services/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',
				json: payload
			}, function (error, response, body) {

				if (error) {
					reject();
				} else {
					resolve();
				}
			});
		});
	}    
} 

module.exports = SlackMessageService;
