import {z} from "zod";

export const schema = z.object({

  avatar: z.any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file?.type),
      "Only .jpg, .jpeg and .png formats are supported."
    ),
  name: z.string().min(3, {message: "Must be 3 or more characters long"}),
  numberServices: z.number().min(0, {message: "Must be positive"}),
});