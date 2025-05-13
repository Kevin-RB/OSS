const express = require('express');
const { createProduct, deleteProductById, getProductById, getProducts, updateProductById } = require('../controllers/product-controller');
const { protect } = require('../middleware/authMiddleware');
const { verifyRole } = require('../middleware/role-middleware');
const router = express.Router();

router.get('/', protect, getProducts);  // This will handle both regular listing and search
router.get('/:productId', protect, getProductById);  // Specific product by ID
router.post('/', protect, verifyRole(['admin']), createProduct); // Create a new product
router.put('/:productId', protect, verifyRole(['admin']), updateProductById); // Update a product by ID
router.delete('/:productId', protect, verifyRole(['admin']), deleteProductById); // Delete a product by ID

module.exports = router;
