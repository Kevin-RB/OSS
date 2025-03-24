
const express = require('express');
const { createProduct, deleteProduct, getProductById, getProducts, updateProductById, getProductByName } = require('../controllers/product-controller');
const { protect } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/admin-middleware');
const router = express.Router();

router.get('/', protect, getProducts);
router.get('/:productId', protect, getProductById);
router.get('/:productName', protect, getProductByName);
router.post('/', protect, verifyAdmin, createProduct);
router.put('/:productId', protect, verifyAdmin, updateProductById);
router.delete('/:productId', protect, verifyAdmin, deleteProduct);

module.exports = router;
