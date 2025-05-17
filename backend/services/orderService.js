const { processOrderPayment } = require('../adapter/PaymentHandler');
const Order = require('../models/Order');
const { orderCreation, orderUpdate } = require('../validation/order-validation');

class OrderService {
    async createOrder(data) {
        // use zod to validate the request body
        const result = orderCreation.safeParse(data);
        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return { success: false, type: 'validation', error: result.error.format() };
        }

        const paymentResult = await processOrderPayment(result.data.totalAmount, data.paymentMethod);

        if (!paymentResult.success) {
            return { success: false, type: 'payment', error: paymentResult.error };
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
            itemsInCart: data.itemsInCart,
            totalAmount: validatedData.totalAmount,
            paymentMethod: validatedData.paymentMethod,
        });

        return { success: true, orderId: order._id, payment: paymentResult };
    }

    async getOrders() {
        return await Order.find({})
            .populate('userId', ['-password', '-role'])
            .populate('itemsInCart.productId');
    }

    async getOrderById(id) {
        // find the product by id
        const order = await Order.findById(id)
            .populate('itemsInCart.productId');
        if (!order) {
            return { success: false, type: 'not_found', message: 'Order not found' };
        }
        // return the product
        return { success: true, order };
    }

    async updateOrderStatus(id, data) {
        // validate the request body
        const result = orderUpdate.safeParse({ ...data, id });
        // if the validation fails, return a 400 response with the error message
        if (!result.success) {
            return { success: false, type: 'validation', error: result.error.format() };
        }

        // get the product details from the request body
        const { orderStatus } = result.data;

        // find the product by id
        const order = await Order.findById(id);
        if (!order) {
            return { success: false, type: 'not_found', message: 'Order not found' };
        }

        // update the product
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            { new: true }
        );

        // return the updated product
        return { success: true, updatedOrder };
    }
}

module.exports = new OrderService();
