import {z} from "zod";

const pets = z.number().array().nonempty('Please select at least one pet')
const times = z.number().array().nonempty('Please select a time slot').transform(time => {
    return {start: time[0], end: time[1]}
}).refine(times => {
    return times.start !== times.end
}, "The selected time must have a minimum duration of one hour")
const address = z.any().refine((address) => {
    return address !== undefined
}, 'Required').refine((address) => {
    return address?.streetNumber !== undefined
}, "You need to specify your street number")

const fullSchema = z.object({pets, times, address,});
const noAddressSchema = z.object({pets, times});

export {
    fullSchema,
    noAddressSchema,
    pets,
    times,
    address
}