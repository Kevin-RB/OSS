const Product = require('../models/Product');
const { productCreation } = require('../validation/product-validation');

const createProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        // use zod to validate the request body
        const result = productCreation.safeParse({ name, price: Number(price), description, imageUrl });

        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format() });
        }

        // check if the product already exists
        const productExists = await Product.findOne({ name });
        if (productExists) return res.status(400).json({ message: 'Product already exists' });

        // create the product
        const product = await Product.create({ name, price, description, imageUrl });
        res.status(201).json({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { name } = req.query;
        const products = name
            ? await Product.find({ name: { $regex: name, $options: 'i' }})
            : await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        // get the product id from the request parameters
        const { productId } = req.params;
        const product = await Product.findById(productId);

        // if the product does not exist, return a 404 response
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // return the product
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        // get the product id from the request parameters
        const { productId } = req.params;
        // find the product by id
        const product = await Product.findById(productId);
        // if the product does not exist, return a 404 response
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // delete the product
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        // get the product id from the request parameters
        const { productId } = req.params;
        // get the product details from the request body
        const { name, price, description, imageUrl } = req.body;
        // validate the request body
        const result = productCreation.safeParse({ name, price, description, imageUrl });
        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format() });
        }
        // find the product by id
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, description, imageUrl },
            { new: true }
        );
        // return the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, getProductById, deleteProductById, updateProductById };
