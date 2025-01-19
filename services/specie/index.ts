import type { APIResponse } from "~/services/types";
import type { InputSpecieAdd, InputSpecieUpdate, Specie, SpecieAdmin } from "~/services/specie/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
    return await axios.get<APIResponse<Specie[]>>(routes.getAll);
}

async function getAllAdmin() {
    return await axios.get<APIResponse<SpecieAdmin[]>>(routes.getAllAdmin);
}

async function getAllByType(typeId: number) {
    return await axios.get<APIResponse<Specie[]>>(`${routes.getByType}${typeId}`);
}

async function updateSpecie(input: InputSpecieUpdate) {
    return await axios.put<APIResponse<SpecieAdmin>>(routes.update, input);
}

async function addSpecie(input: InputSpecieAdd) {
    return await axios.post<APIResponse<SpecieAdmin>>(routes.add, input);
}

async function deleteById(specieId: number) {
    return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${specieId}`);
}


export default {
    getAll,
    getAllAdmin,
    getAllByType,
    updateSpecie,
    addSpecie,
    deleteById,
}