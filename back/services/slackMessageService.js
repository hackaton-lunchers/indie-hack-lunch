"use strict"

var request = require('request');

class SlackMessageService {

	sendMenu(menu, channel) {

		var payload = {

			"channel": "@tomas_milata", 
			"username": "Lunch Menu",
			"text": "This is posted to #general and comes from a bot named webhookbot.", 
			"icon_emoji": ":spaghetti:"

		}

		request.post({
			url:     'https://hooks.slack.com/services/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',
			json:    payload
		}, function(error, response, body){
			console.log(error);
		})
	}    
} 

module.exports = SlackMessageService;
