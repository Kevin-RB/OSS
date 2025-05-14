const ProductFactory = require('../factories/productFactory');
const Product = require('../models/Product');
const { productCreation } = require('../validation/product-validation');

class ProductService {
    async createProduct(data) {
        // use zod to validate the request body
        const result = productCreation.safeParse(data);
        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return { success: false, type: 'validation', error: result.error.format() };
        }

        const { name, price, description, imageUrl } = result.data;
        // check if the product already exists
        const productExists = await Product.findOne({ name });
        if (productExists) {
            return { success: false, type: 'duplicate', message: 'Product already exists' };
        }

        // create the product
        const product = await ProductFactory.createProduct(result.data);
        return {
            success: true,
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                type: product.type,
            }
        };
    }

    async getProducts(filter) {
        if (filter?.name) {
            return await Product.find({ name: { $regex: filter.name, $options: 'i' } });
        }
        return await Product.find({});
    }

    async getProductById(productId) {
        const product = await Product.findById(productId);
        // if the product does not exist, return a 404 response
        if (!product) return null;
        return product;
    }

    async deleteProductById(productId) {
        // find the product by id
        const product = await Product.findById(productId);
        // if the product does not exist, return a 404 response
        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        // delete the product
        await Product.findByIdAndDelete(productId);
        return { success: true, message: 'Product deleted successfully' };
    }

    async updateProductById(productId, data) {
        const result = productCreation.safeParse(data);
        if (!result.success) {
            return { success: false, type: 'validation', error: result.error.format() };
        }

        // find the product by id
        const product = await Product.findById(productId);
        if (!product) {
            return { success: false, type: 'not_found', message: 'Product not found' };
        }

        // update the product
        const updatedProduct = await Product.findByIdAndUpdate(productId, result.data, { new: true });
        // return the updated product
        return { success: true, product: updatedProduct };
    }
}

module.exports = new ProductService();
