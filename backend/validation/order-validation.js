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
    itemsInCart: z.array(z.object({
        productId: z.string().nonempty(),
        quantity: z.number().nonnegative()
    })).nonempty()
});

const orderUpdate = z.object({
    orderStatus: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    id: z.string().nonempty()
});

export { orderCreation, orderUpdate };