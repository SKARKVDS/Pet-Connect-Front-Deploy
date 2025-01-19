import type { APIResponse } from "~/services/types";
import type { Sex } from "~/services/sex/types";

import axios from "../api"
import { routes } from "./routes";
import type { RequestSend, RequestReceive, InputRequestAdd } from "~/services/request/types";

async function getAllSendByToken() {
  return await axios.get<APIResponse<RequestSend[]>>(routes.getAllSend);
}

async function getAllReceiveByToken() {
  return await axios.get<APIResponse<RequestReceive[]>>(routes.getAllReceive);
}

async function acceptRequest(requestId: number) {
  return await axios.put<APIResponse<boolean>>(routes.accept, {id :requestId});
}

async function acceptNoMoreRequest(requestId: number) {
  return await axios.put<APIResponse<boolean>>(routes.acceptNoMore, {id :requestId});
}

async function addRequest(input: InputRequestAdd) {
  return await axios.post<APIResponse<boolean>>(routes.add, input);
}

async function deleteById(requestId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${requestId}`);
}


export default {
  getAllSendByToken,
  getAllReceiveByToken,
  acceptRequest,
  acceptNoMoreRequest,
  addRequest,
  deleteById,
}