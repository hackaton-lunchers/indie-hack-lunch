"use strict"

class ProductService{
    constructor() {
        this._products = [
            {
                id: 1,
                title: "Product A",
                categoryId: 3
            },
            {
                id: 2,
                title: "Product B",
                categoryId: 3
            },
            {
                id: 3,
                title: "Product C",
                categoryId: 2
            }
        ];
    }

    getByCategory(category) {
        let that = this;
        return new Promise(function(resolve, reject) {
            for (let i = 0; i < that._products.length; i++) {
                let product = that._products[i];

                if (product.categoryId === category.id) {
                    resolve(product);
                }
            }
            resolve(null);
        });
    }
}

module.exports = ProductService;
