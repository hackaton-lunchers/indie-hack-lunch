"use strict";

var UserRepository = require('../repositories/userRepository');

class UserService{
    constructor() {
        this._users = [
            {
                username: 'john',
                password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
                name: 'John Doe',
                id: 1
            }
        ];

		this._userRepository = new UserRepository();
    }

    getUser(username) {
        let that = this;
        return new Promise(function(resolve, reject) {
            for (var i = 0; i < that._users.length; i++) {
                let user = that._users[i];
                if (user.username === username) {
                    resolve(user);
                }
            }
            reject('Unknown user');
        });
    }

    getUsers() {

    }

}

module.exports = UserService;
