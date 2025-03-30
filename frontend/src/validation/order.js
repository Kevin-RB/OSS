import { z } from "zod";

const orderCreation = z.object({
    userId: z.string().nonempty("User ID is required"),
    email: z.string().email("Invalid email format"),
    nameOnCard: z.string().nonempty("Name on card is required"),
    cardNumber: z.string().nonempty("Card number is required"),
    expirationDate: z.string().nonempty("Expiration date is required"),
    cvc: z.string().nonempty("CVC is required"),
    shippingAddress: z.string().nonempty("Shipping address is required"),
    shippingCity: z.string().nonempty("Shipping city is required"),
    shippingState: z.string().nonempty("Shipping state is required"),
    shippingZip: z.string().nonempty("Shipping zip code is required"),
    itemsInCart: z.array(z.object({
        productId: z.string().nonempty("Product ID is required"),
        quantity: z.number().nonnegative("Quantity must be a non-negative number"),
    })).nonempty("Items in cart cannot be empty")
});

const orderUpdate = z.object({
    orderStatus: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    id: z.string().nonempty("Order ID is required"),
});

export { orderCreation, orderUpdate };