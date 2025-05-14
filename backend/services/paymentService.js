class PaymentService {
  constructor() {
    this.payment = null;
  }

  createPayment(amount, method) {
    const payment = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      amount,
      method,
      status: 'pending',
    };
    this.payment = payment;
    return payment;
  }

  getPayment() {
    return this.payment;
  }

  updatePayment(status) {
    const payment = this.getPayment();
    if (!payment) {
      return null;
    }
    payment.status = status;
    return payment;
  }

  processPayment(paymentProcessor) {
    const payment = this.getPayment();
    console.log('Processing payment:', payment);
    if (!payment) {
      return null;
    }
    return paymentProcessor.processPayment(payment);
  }
}

module.exports = PaymentService;