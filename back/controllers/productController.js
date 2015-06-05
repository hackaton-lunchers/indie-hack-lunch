"use strict"

var services = require('../services');

class ProductController{
    constructor() {
    }

    getByCategory(request, reply) {
        let categoryId = parseInt(request.url.query.id);

        services.categories.getById(categoryId)
            .then(function(category){
                if (!category) {
                    reply('Unknown category: ' + categoryId).code(404);
                } else {
                    return services.products.getByCategory(category).then(function(products){
                        reply(products);
                    });
                }
            });
    }

    getDetail(request, reply) {
        let productId = parseInt(request.url.query.id);

        services.products.getDetail(productId).then(function(product){
            if (!product) {
                reply('Unknown product: ' + productId).code(404);
            } else {
                reply(products);
            }
        });
    }
}

module.exports = ProductController;
