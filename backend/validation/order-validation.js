import { z } from "zod";

// Validation schema for product creation
const orderCreation = z.object({
    userId: z.string().nonempty(),
    email: z.string().email(),
    nameOnCard: z.string().nonempty(),
    cardNumber: z.string().nonempty(),
    expirationDate: z.string().nonempty(),
    cvc: z.string().nonempty(),
    shippingAddress: z.string().nonempty(),
    shippingCity: z.string().nonempty(),
    shippingState: z.string().nonempty(),
    shippingZip: z.string().nonempty(),
    amount: z.number().positive("Amount must be a positive number"),
    paymentMethod: z.enum(["Credit Card", "Debit Card", "PayPal"]),
    itemsInCart: z.array(z.object({
        productId: z.string().nonempty("Product ID cannot be empty"),
        quantity: z.number().nonnegative("Quantity must be a non-negative number"),
    })).nonempty("Items in cart cannot be empty"),
});

const orderUpdate = z.object({
    orderStatus: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    id: z.string().nonempty()
});

export { orderCreation, orderUpdate };