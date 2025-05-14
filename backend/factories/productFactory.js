const Product = require('../models/Product');

class ProductFactory {
    static async createProduct(productData) {
        switch(productData.type) {
            case 'physical':
                return new PhysicalProduct(productData).create();
            case 'digital':
                return new DigitalProduct(productData).create();
            default:
                // default product type
                return new PhysicalProduct(productData).create();
        }
    }
}

class PhysicalProduct {
    constructor(productData) {
        this.productData = productData;
        this.productData.type = 'physical';
    }

    async create() {
        return await Product.create(this.productData);
    }
}

class DigitalProduct {
    constructor(productData) {
        this.productData = productData;
        this.productData.type = 'digital';
    }

    async create() {
        return await Product.create(this.productData);
    }
}

module.exports = ProductFactory;