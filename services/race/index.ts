import type { APIResponse } from "~/services/types";
import type { InputRaceAdd, InputRaceUpdate, Race } from "~/services/race/types";

import axios from "../api"
import { routes } from "./routes";

async function getAllBySpecie(specieId : number) {
  return await axios.get<APIResponse<Race[]>>(`${routes.getAllBySpecie}${specieId}`);
}

async function updateRace(input: InputRaceUpdate) {
  return await axios.put<APIResponse<Race>>(routes.update, input);
}

async function addRace(input: InputRaceAdd) {
  return await axios.post<APIResponse<Race>>(routes.add, input);
}

async function deleteById(raceId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${raceId}`);
}

export default {
  getAllBySpecie,
  updateRace,
  addRace,
  deleteById,
}