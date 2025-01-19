import {z} from "zod";

export const schema = z.object({
  name: z.string().min(3, {message: "Must be 3 or more characters long"}),
  numberServices: z.number().min(0, {message: "Must be positive"}),
});