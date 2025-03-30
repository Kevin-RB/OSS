
const express = require('express');
const { createOrder, getOrders, updateOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/', protect, updateOrder);

module.exports = router;
