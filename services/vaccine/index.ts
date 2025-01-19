import type { APIResponse } from "~/services/types";
import type { InputVaccineAdd, InputVaccineUpdate, Vaccine } from "~/services/vaccine/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
  return await axios.get<APIResponse<Vaccine[]>>(routes.getAll);
}

async function updateVaccine(input: InputVaccineUpdate) {
  return await axios.put<APIResponse<Vaccine>>(routes.update, input);
}

async function addVaccine(input: InputVaccineAdd) {
  return await axios.post<APIResponse<Vaccine>>(routes.add, input);
}

async function deleteById(vaccineId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${vaccineId}`);
}

export default {
  getAll,
  updateVaccine,
  addVaccine,
  deleteById,
}