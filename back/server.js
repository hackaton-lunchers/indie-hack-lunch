"use scrict"

var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');
var lout = require('lout');
var Routes = require('./routes');
var services = require('./services');
var repeat = require('repeat');
var mongoose = require('mongoose');

var server = new Hapi.Server();
var routes = new Routes(server);

server.connection({ port: 8084 });

server.register({ register: lout }, function(err) {
    if (err) {
        console.log('failed loading lout');
    }
});

var validate = function (username, password, callback) {
    services.authentication.isValid(username, password)
    .then(function(user) {
        callback(null, true, { id: user.id, name: user.name });
    })
    .catch(function(err){
        callback(null, false);
    })
};

server.register(Basic, function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    routes.install();

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});

mongoose.connect('mongodb://admin:lunchers123@ds043262.mongolab.com:43262/lunchers');

repeat(function() {
    services.restaurants.loadDailyMenus().then(services.restaurants.sendMenu('#lunch-slackbot-test'));
}).every(24, 'h').start.in(24, 'h');
