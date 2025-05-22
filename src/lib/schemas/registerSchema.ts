import { z } from "zod";
import { requiredString } from "../../utils/util";

export const registerSchema = z.object({
    email: z.string().email(),
    password: requiredString('password'),
    firstName: requiredString('firstName'),
    lastName: requiredString('lastName')
})

export type RegisterSchema = z.infer<typeof registerSchema>;