
const PaymentService = require('../services/paymentService');
const PaymentAdapterFactory = require('./PaymentAdapterFactory');

/**
 * Example function to process a payment
 * @param {Object} order - Order information
 * @param {string} paymentMethod - Payment method (stripe or paypal)
 * @returns {Promise<Object>} - Promise resolving to the payment result
 */

async function processOrderPayment(amount, paymentMethod) {
  try {
    // Create payment service
    const paymentService = new PaymentService();
    // Create payment record
    const payment = paymentService.createPayment(amount, paymentMethod);

    // Get factory and create appropriate payment adapter
    const paymentAdapterFactory = PaymentAdapterFactory.getInstance();
    const paymentAdapter = paymentAdapterFactory.createAdapter(paymentMethod);

    // Process the payment
    const paymentResult = await paymentService.processPayment(paymentAdapter);
    if (paymentResult && paymentResult.success) {

      paymentService.updatePayment('completed');

      // In a real app, we would save the updated payment to MongoDB here

      // Return success response
      return {
        success: true,
        processorPaymentId: paymentResult.payment.processorPaymentId,
        message: `Payment of ${payment.amount} processed successfully via ${paymentMethod}`,
        paymentDetails: payment,
      };
    } else {
      // Update payment status (returns updated object, but doesn't store it)
      paymentService.updatePayment(payment, 'failed');

      // In a real app, we would save the updated payment to MongoDB here

      // Return error response
      return {
        success: false,
        paymentId: payment.id,
        error: paymentResult.error || 'Payment processing failed'
      };
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}

module.exports = { processOrderPayment };
