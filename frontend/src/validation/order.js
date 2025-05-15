import { z } from "zod";

const orderUpdate = z.object({
    orderStatus: z.enum(["Pending", "Shipped", "Delivered", "Canceled"]),
    id: z.string().nonempty("Order ID is required"),
});

const paymentMethods = z.enum(["card", "paypal"]);

const baseOrder = z.object({
    userId: z.string().nonempty("User ID is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    totalAmount: z.number().positive("Total amount must be a positive number"),
    itemsInCart: z.array(z.object({
        productId: z.string().nonempty("Product ID is required"),
        quantity: z.number().nonnegative("Quantity must be a non-negative number"),
    })).nonempty("Items in cart cannot be empty")
});

const shippingDetailsSchema = z.object({
    shippingAddress: z.string().nonempty("Shipping address is required"),
    shippingCity: z.string().nonempty("Shipping city is required"),
    shippingState: z.string().nonempty("Shipping state is required"),
    shippingZip: z.string().nonempty("Shipping zip code is required"),
});

const cardDetails = z.object({
    nameOnCard: z.string().nonempty("Name on card is required"),
    cardNumber: z.string().nonempty("Card number is required"),
    expirationDate: z.string().nonempty("Expiration date is required"),
    cvc: z.string().nonempty("CVC is required"),
});

const orderCreation = z.discriminatedUnion("paymentMethod", [
    // Card payment schema
    z.object({
        paymentMethod: z.literal(paymentMethods.Enum.card),
    }).extend(baseOrder.shape).extend(shippingDetailsSchema.shape).extend(cardDetails.shape),

    // PayPal payment schema
    z.object({
        paymentMethod: z.literal(paymentMethods.Enum.paypal),
    }).extend(baseOrder.shape).extend(shippingDetailsSchema.shape),
]);

export { orderCreation, orderUpdate };