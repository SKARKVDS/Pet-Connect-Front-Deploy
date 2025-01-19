import {z} from "zod";

export const schema = z.object({
  description: z.string().min(3, {message: "Must be 3 or more characters long"}),
});