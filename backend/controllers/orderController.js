const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: result.type === 'validation' ? 'Validation error' : 'Failed to create order',
                error: result.error
            });
        }

        res.status(201).json({ message: "Order created", id: result.orderId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const result = await orderService.updateOrderStatus(req.body);
        if (!result.success) {
            if (result.type === 'validation') {
                return res.status(400).json({ message: 'Validation error', error: result.error });
            }
            if (result.type === 'not_found') {
                return res.status(404).json({ message: result.message });
            }
        }

        res.status(200).json(result.updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, updateOrder };
