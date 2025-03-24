
const Product = require('../models/Product');
const { productCreation } = require('../validation/product-validation');

const createProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const result = productCreation.safeParse({ name, email, password });

        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format()});
        }

        const productExists = await Product.findOne({ name });
        if (productExists) return res.status(400).json({ message: 'Product already exists' });

        const product = await Product.create({ name, price, description, imageUrl });
        res.status(201).json({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductByName = async (req, res) => {
    try {
        const { productName } = req.query;
        
        if (!productName) {
            return res.status(400).json({ message: 'Product name is required' });
        }
        
        const product = await Product.find({ name: /productName/i }, 'name');
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, description, imageUrl } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const result = productCreation.safeParse({ name, price, description, imageUrl });
        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format() });
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, 
            { name, price, description, imageUrl }, 
            { new: true }
        );
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createProduct, getProducts, getProductById, deleteProduct, updateProductById, getProductByName };
