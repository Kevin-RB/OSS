const express = require('express');
const { createProduct, deleteProductById, getProductById, getProducts, updateProductById } = require('../controllers/product-controller');
const { protect } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/admin-middleware');
const router = express.Router();

router.get('/', protect, getProducts);  // This will handle both regular listing and search
router.get('/:productId', protect, getProductById);  // Specific product by ID
router.post('/', protect, verifyAdmin, createProduct);
router.put('/:productId', protect, verifyAdmin, updateProductById);
router.delete('/:productId', protect, verifyAdmin, deleteProductById);

module.exports = router;
