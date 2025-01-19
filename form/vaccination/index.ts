import {z} from "zod";

export const schema = z.object({
  vaccineId: z.any(),
  dateVaccination: z.date().or(z.number()).transform((value) => {
    if (value instanceof Date) {
      return value.getTime(); // Si c'est une Date, convertir en timestamp
    }
    return value; // Si c'est déjà un nombre, le garder tel quel
  }),
  dateBooster: z.date().or(z.number()).optional().transform((value) => {
    if(value == null) {
      return 0;
    }

    if (value instanceof Date) {
      return value.getTime(); // Si c'est une Date, convertir en timestamp
    }
    return value; // Si c'est déjà un nombre, le garder tel quel
  }),
});