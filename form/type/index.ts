import {z} from "zod";

export const schema = z.object({
  name: z.string().min(3, {message: "Must be 3 or more characters long"}),
  addressProposal: z.boolean().default(false),
  species: z.array(z.number()).min(1, {message: "Must have 1 or more specie"}),
});