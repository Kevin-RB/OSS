
class PaymentAdapter {
  async processPayment(payment) {
    throw new Error('processPayment method must be implemented by subclasses');
  }

  async verifyPayment(paymentId) {
    throw new Error('verifyPayment method must be implemented by subclasses');
  }

  async refundPayment(paymentId, amount = null) {
    throw new Error('refundPayment method must be implemented by subclasses');
  }
}

module.exports = PaymentAdapter;
