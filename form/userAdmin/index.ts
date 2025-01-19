import {z} from "zod";

export const schema = z.object({
  userName: z.string().min(3, {message: "Must be 3 or more characters long"}),
  firstName: z.string().min(3, {message: "Must be 3 or more characters long"}),
  lastName: z.string().min(3, {message: "Must be 3 or more characters long"}),
  email: z.string().email().min(3, {message: "Must be 3 or more characters long"}),
  phoneNumber: z.string().min(3, {message: "Must be 3 or more characters long"}),
  countService: z.number().min(0, {message: "Must be positive"}),
});