import type { APIResponse } from "~/services/types";
import type { InputTypeNotificationAdd, InputTypeNotificationUpdate, TypeNotification } from "~/services/typeNotification/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
  return await axios.get<APIResponse<TypeNotification[]>>(routes.getAll);
}

async function updateTypeNotification(input: InputTypeNotificationUpdate) {
  return await axios.post<APIResponse<TypeNotification>>(routes.update, input);
}

async function addTypeNotification(input: InputTypeNotificationAdd) {
  return await axios.post<APIResponse<TypeNotification>>(routes.add, input);
}

async function deleteById(typeNotificationId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${typeNotificationId}`);
}

export default {
  getAll,
  updateTypeNotification,
  addTypeNotification,
  deleteById,
}