import type { APIResponse } from "~/services/types";
import type { InputNotificationAdd, Notification } from "~/services/notification/types";

import axios from "../api"
import { routes } from "./routes";


async function getCount() {
  return await axios.get<APIResponse<Number>>(routes.getCount);
}

async function getAll() {
  return await axios.get<APIResponse<Notification[]>>(routes.getAll);
}


async function addNotification(input: InputNotificationAdd) {
  return await axios.post<APIResponse<Notification>>(routes.add, input);
}

async function deleteById(notificationId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${notificationId}`);
}

export default {
  getCount,
  getAll,
  addNotification,
  deleteById,
}