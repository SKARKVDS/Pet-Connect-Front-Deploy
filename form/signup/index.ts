import {z} from "zod";

const email = z.string().email().min(3, {message: "Must be 3 or more characters long"});
const password = z.string().min(8).max(50).refine(
    password => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(password)
)
const userName = z.string().min(3, {message: "Must be 3 or more characters long"});
const firstName = z.string().min(3, {message: "Must be 3 or more characters long"});
const lastName = z.string().min(3, {message: "Must be 3 or more characters long"});
const phoneNumber = z.string().min(3, {message: "Must be 3 or more characters long"});

const schema = z.object({email, password, userName, firstName, lastName, phoneNumber});

export {
    schema,
    email,
    password,
    userName,
    firstName,
    lastName,
    phoneNumber
}