import type { APIResponse } from "~/services/types";
import type { InputTypeAdd, InputTypeUpdate, Type, TypeAdmin } from "~/services/type/types";

import axios from "../api"
import { routes } from "./routes";

async function getAllAdmin() {
  return await axios.get<APIResponse<TypeAdmin[]>>(routes.getAllAdmin);
}

async function getAll() {
  return await axios.get<APIResponse<Type[]>>(routes.getAll);
}

async function getById(typeId: number) {
  return await axios.get<APIResponse<Type>>(`${routes.getById}${typeId}`);
}

async function updateType(input: InputTypeUpdate) {
  return await axios.put<APIResponse<TypeAdmin>>(routes.update, input);
}

async function addType(input: InputTypeAdd) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios.post<APIResponse<TypeAdmin>>(routes.add, input , config);
}

async function deleteById(typeId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${typeId}`);
}

export default {
  getAllAdmin,
  getAll,
  getById,
  updateType,
  addType,
  deleteById,
}