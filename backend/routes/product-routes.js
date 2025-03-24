
const express = require('express');
const { createProduct, deleteProduct, getProductById, getProducts, updateProductById, getProductByName } = require('../controllers/product-controller');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getProducts);
router.get('/:productId', protect, getProductById);
router.get('/:productName', protect, getProductByName);
router.post('/', protect, createProduct);
router.put('/:productId', protect, updateProductById);
router.delete('/:productId', protect, deleteProduct);


module.exports = router;
