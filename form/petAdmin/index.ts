import {z} from "zod";

const nickName = z.string().min(3, {message: "Must be 3 or more characters long"});
const sexId = z.number({ required_error: "Please select the sex of your pet", message: "Please select the sex of your pet"});
const birthDate = z.date().or(z.number()).transform((value) => {
    if (value instanceof Date) {
        return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), 0, 0, 0)).getTime() // Si c'est une Date, convertir en timestamp
    }
    return value; // Si c'est déjà un nombre, le garder tel quel
});
const specieId = z.string();
const raceId = z.any();
const identification = z.string();

const schema = z.object({ nickName, sexId, birthDate, raceId, identification});

export {
    schema,
    nickName,
    birthDate,
    specieId,
    raceId
}