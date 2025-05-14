const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderStatus: { type: String, default: 'Pending' },
    shippingAddress: { type: String, required: true },
    shippingCity: { type: String, required: true },
    shippingState: { type: String, required: true },
    shippingZip: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    itemsInCart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
});

module.exports = mongoose.model('Order', orderSchema);
