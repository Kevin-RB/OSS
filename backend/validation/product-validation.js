import { z } from "zod";

const productCreation = z.object({
    name: z.string().nonempty(),
    price: z.number().nonempty(),
    description: z.string().nonempty(),
    imageUrl: z.string().url().nonempty()
});

export { productCreation };