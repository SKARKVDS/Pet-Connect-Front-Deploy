import type { APIResponse } from "~/services/types";
import type { Memory, InputMemoryAdd } from "~/services/memory/types";

import axios from "../api"
import { routes } from "./routes";

async function getAllByReservationId(reservationId: number) {
  return await axios.get<APIResponse<Memory[]>>(`${routes.getAllByReservationId}${reservationId}`);
}

async function addMemory(input: InputMemoryAdd) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return await axios.post<APIResponse<Memory>>(`${routes.addMemory}`, input, config);
}

async function deleteById(id: string) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteBylId}${id}`);
}

export default {
  getAllByReservationId,
  addMemory,
  deleteById
}