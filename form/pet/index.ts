import {z} from "zod";

const avatar = z.any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file?.type),
        "Only .jpg, .jpeg and .png formats are supported."
    );
const nickName = z.string().min(3, {message: "Must be 3 or more characters long"});
const sexId = z.number({ required_error: "Please select the sex of your pet", message: "Please select the sex of your pet"});
const birthDate = z.date().transform((date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)).getTime());
const specieId = z.string();
const raceId = z.any();
const identification = z.string().optional();

const schema = z.object({avatar, nickName, sexId, birthDate, raceId, identification});

export {
    schema,
    avatar,
    nickName,
    birthDate,
    specieId,
    raceId
}