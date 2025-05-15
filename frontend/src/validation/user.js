import { z } from "zod";

const userSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Password is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// Login
export const loginSchema = userSchema.omit({ name: true });

// Register
export const registerSchema = userSchema;
