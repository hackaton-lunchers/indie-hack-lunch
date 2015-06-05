# Sample eshop backend written in ECMAScript 6 using io.js

# How to install
- Install io.js: https://iojs.org
- If have standard Node installed, use Node Version Manager to switch between Node and iojs, this article may be helpful: https://keymetrics.io/2015/02/03/installing-node-js-and-io-js-with-nvm/
- If you don't want to use NVM you can always just make sure that standard Node is not in your PATH and that iojs is.
- Install all dependencies using ````npm install````

# How to run
```
npm run start
```
To authenticate use username: 'john' and password: 'secret'.
All requests except root require authentication (basic).

# How to run tests
```
npm run test
```

# Browse endpoints
```
http://localhost:8081/docs
```

#EMCAScript 6 features currently used
 - 'let' keyword
 - Promise API
 - classes
 - Map

List of all ECMAScipt 6 features can be found here: http://es6-features.org/
Not all of the feature are currently implemented by iojs. Always keep your iojs up to date. ES6 information can be found here: https://iojs.org/en/es6.html

# Other software used
* io.js https://github.com/nodejs/io.js
* hapi https://github.com/hapijs/hapi
* mocha https://github.com/mochajs/mocha
* chai https://github.com/chaijs/chai
* bcryptjs https://github.com/dcodeIO/bcrypt.js

# License 
[MIT](LICENCE)
