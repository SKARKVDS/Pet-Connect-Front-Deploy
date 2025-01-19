import {z} from "zod";
import type {Address} from "~/services/address/types";
import type {Type} from "~/services/type/types";

const typeId = z.any().transform(obj => obj?.id)
const address = z.any().refine((address) => {
    return address !== undefined
}, 'Required').refine((address) => {
    return address?.streetNumber !== undefined
}, "You need to specify your street number")
const description = z.string().min(3, 'Minimum length of 3 characters')
const species = z.number().array().nonempty('Please select at least one species')

const fullSchema = z.object({typeId, address, description, species});
const noAddressSchema = z.object({typeId, description, species});

export {
    fullSchema,
    noAddressSchema,
    typeId,
    address,
    description,
    species
}