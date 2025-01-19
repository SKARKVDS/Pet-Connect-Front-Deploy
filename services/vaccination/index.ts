import type { APIResponse } from "~/services/types";
import type {
  InputVaccinationAdd,
  InputVaccinationUpdate,
  Vaccination,
  VaccinationDashBoard,
} from "~/services/vaccination/types";

import axios from "../api"
import { routes } from "./routes";

async function getAllFutureByToken() {
  return await axios.get<APIResponse<VaccinationDashBoard[]>>(`${routes.getAllFutureByToken}`);
}

async function getAllByPet(petId : number) {
  return await axios.get<APIResponse<Vaccination[]>>(`${routes.getAllByPet}${petId}`);
}

async function updateVaccination(input: InputVaccinationUpdate) {
  return await axios.put<APIResponse<Vaccination>>(routes.update, input);
}

async function addVaccination(input: InputVaccinationAdd) {
  return await axios.post<APIResponse<Vaccination>>(routes.add, input);
}

async function deleteById(vaccinationId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${vaccinationId}`);
}

export default {
  getAllFutureByToken,
  getAllByPet,
  updateVaccination,
  addVaccination,
  deleteById,
}