import {z} from "zod";

const avatar = z.any()
    .refine((file) => file !== undefined, 'Required')
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file?.type),
        "Only .jpg, .jpeg and .png formats are supported."
    )

const description = z.string().min(3, {message: "Must be 3 or more characters long"});

const schema = z.object({avatar, description});

export {
    schema,
    avatar,
    description
}