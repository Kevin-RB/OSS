const StripeAdapter = require('./StripeAdapter');
const PayPalAdapter = require('./PayPalAdapter');

const paymentMethods = {
    "card": StripeAdapter,
    paypal: PayPalAdapter,
};

class PaymentAdapterFactory {

    static #instance;

    constructor() {
        if (PaymentAdapterFactory.#instance) {
            return PaymentAdapterFactory.#instance;
        }
        PaymentAdapterFactory.#instance = this;
    }

    static getInstance() {
        if (!PaymentAdapterFactory.#instance) {
            console.log('Creating PaymentAdapterFactory instance');
            PaymentAdapterFactory.#instance = new PaymentAdapterFactory();
        }
        console.log('Returning existing PaymentAdapterFactory instance');
        return PaymentAdapterFactory.#instance;
    }

    createAdapter(method) {
        if (!method) {
            throw new Error('Payment method is required');
        }
        const Adapter = paymentMethods[method.toLowerCase()];
        console.log('Adapter:', Adapter);
        if (!Adapter) {
            throw new Error(`Unsupported payment method: ${method}`);
        }
        return new Adapter();
    }
}

module.exports = PaymentAdapterFactory;
