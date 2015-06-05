"use strict"

var Bcrypt = require('bcryptjs');
var services = require('./');

class AuthenticationService{
    constructor() {
    }

    isValid(username, password){
        let that = this;
        return new Promise(function(resolve, reject) {
            services.users.getUser(username)
            .then(function(user){
                Bcrypt.compare(password, user.password, function (err, isValid) {
                    if (isValid) {
                        resolve(user);
                    } else {
                        reject(err);
                    }
                });
            })
            .catch(function(err){
                reject(err);
            })
        });
    }
}

module.exports = AuthenticationService;
