import { z } from 'zod'

export const verifySchema = z.object({
    code: z.string().min(6, { message: "Verification Code must be 6 digits!" })
})