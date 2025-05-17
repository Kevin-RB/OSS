const orderService = require('../services/orderService');

const errors = {
    validation: 'Validation error',
    payment: 'Payment error',
}

const createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: errors[result.type] || 'Failed to create order',
                type: result.type,
                error: result.error,
            });
        }
        res.status(201).json({ message: "Order created", id: result.orderId, payment: result.payment });
    } catch (error) {
        console.error('Error creating order:', error);
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

const getOrderById = async (req, res) => {
    try {
        const { success, order, message } = await orderService.getOrderById(req.params.id);
        if (!success) {
            return res.status(404).json({ message });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const result = await orderService.updateOrderStatus(id, req.body);

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

module.exports = { createOrder, getOrders, updateOrder, getOrderById };
