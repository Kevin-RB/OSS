const Order = require('../models/Order');
const { orderCreation, orderUpdate } = require('../validation/order-validation');

const createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        // use zod to validate the request body
        const result = orderCreation.safeParse(orderData);

        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format() });
        }

        const validatedData = result.data;
        // create the product
        const order = await Order.create({
            userId: validatedData.userId,
            email: validatedData.email,
            shippingAddress: validatedData.shippingAddress,
            shippingCity: validatedData.shippingCity,
            shippingState: validatedData.shippingState,
            shippingZip: validatedData.shippingZip,
            itemsInCart: orderData.itemsInCart,
        });
        res.status(201).json({ message: "Order created", id: order._id });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const products = await Order.find({})
            .populate('userId', ["-password", "-role"])
            .populate('itemsInCart.productId');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        // get the product details from the request body
        const { orderStatus, id } = req.body;
        // validate the request body
        const result = orderUpdate.safeParse({ orderStatus, id });
        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return res.status(400).json({ message: 'Validation error', error: result.error.format() });
        }
        const validatedData = result.data;
        // find the product by id
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // update the product
        const updatedProduct = await Order.findByIdAndUpdate(
            order._id,
            { orderStatus: validatedData.orderStatus },
            { new: true }
        );
        // return the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createOrder, getOrders, updateOrder };
