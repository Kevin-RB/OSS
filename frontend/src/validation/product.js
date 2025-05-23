import { z } from "zod";

// Validation schema for product creation
const productSchema = z.object({
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
    description: z.string().nonempty(),
    imageUrl: z.string().url().nonempty()
});

export { productSchema };