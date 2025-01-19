import {z} from "zod";

export const schema = z.object({
    email: z.string().email().min(3, {message: "Must be 3 or more characters long"}),
    password: z.string().min(3, {message: "Must be 3 or more characters long"})
});