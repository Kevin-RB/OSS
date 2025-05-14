const productService = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const result = await productService.createProduct(req.body);
        if (!result.success) {
            if (result.type === 'validation') {
                return res.status(400).json({ message: 'Validation error', error: result.error });
            }
            if (result.type === 'duplicate') {
                return res.status(400).json({ message: result.message });
            }
        }

        res.status(201).json(result.product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const result = await productService.deleteProductById(req.params.productId);
        if (!result.success) return res.status(404).json({ message: result.message });
        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        const result = await productService.updateProductById(req.params.productId, req.body);
        if (!result.success) {
            if (result.type === 'validation') {
                return res.status(400).json({ message: 'Validation error', error: result.error });
            }
            if (result.type === 'not_found') {
                return res.status(404).json({ message: result.message });
            }
        }

        res.status(200).json(result.product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProductById,
    updateProductById,
};
