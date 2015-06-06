"use strict"

var request = require('request');

var URL = 'https://hooks.slack.com/services/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'


class SlackMessageService {

	//@username
	//+channel
	sendMenu(restaurant, channels, done) {

		var payload = {

			"username": "Lunch Menu",
			"text": restaurant.title + " <https://url.com/|Im going>",
			"icon_emoji": ":spaghetti:",

			"attachments": [
			{
				"fallback": "",
				"fields": new Array()
			}
			]
		};

		var internalChannels;
		var userChannels = false;

		if (!channels || channels.length <= 0) {
			userChannels = true;
			internalChannels = restaurant.users;
		} else {
			internalChannels = channels;
		}



		return new Promise(function(resolve, reject) {

			var sendPromisses = [];

			internalChannels.forEach(function (channel) {
				sendPromisses.push(new Promise(function (resolve, reject) {

					restaurant.menu.forEach(function (m) {
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

					payload.channel = (userChannels ? "@" : "") + channel;


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
				}));
			});

			Promise.all(sendPromisses).then(function() {
				resolve();
			});
		});


	}    

	sendUserIsGoingTo(username, restaurant, channel, done) {
		var payload = {
			"channel": channel, 
			"username": "Lunch",
			"text": "@" + username + " is going to " + restaurant + ".", 
			"icon_emoji": ":spaghetti:"
		};

		request.post({
			url:     URL,
			json:    payload
		}, function(error, response, body){
			console.log(error);
			done();
		})
	}  
} 

module.exports = SlackMessageService;
