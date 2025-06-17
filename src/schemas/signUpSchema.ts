import { z } from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "Name is shorter than 2 words!")
    .max(20, "Name cannot be larger than 20 words!")
    .regex(/^[a-zA-Z0-9_]+$/, "Username is invalid!")

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(6, { message: "Password too short! Must be at least 6 characters." })
})