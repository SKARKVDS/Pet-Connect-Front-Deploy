import type { APIResponse } from "~/services/types";

import axios from "../api"
import type { ReservationDashboard, ReservationRequest, ReservationProposal } from "~/services/reservation/types";
import { routes } from "./routes";

async function getAllProposalByToken() {
  return await axios.get<APIResponse<ReservationDashboard[]>>(routes.getAllProposalByToken);
}

async function getAllRequestByToken() {
  return await axios.get<APIResponse<ReservationDashboard[]>>(routes.getAllRequestByToken);
}

async function getAllMemoryProposalByToken() {
  return await axios.get<APIResponse<ReservationDashboard[]>>(routes.getAllMemoryProposalByToken);
}

async function getAllMemoryRequestByToken() {
  return await axios.get<APIResponse<ReservationDashboard[]>>(routes.getAllMemoryRequestByToken);
}

async function getRequestById(id: number) {
  return await axios.get<APIResponse<ReservationRequest>>(`${routes.getRequestById}${id}`);
}

async function getProposalById(id: number) {
  return await axios.get<APIResponse<ReservationProposal>>(`${routes.getProposalById}${id}`);
}

async function finishReservation(id: number) {
  return await axios.put<APIResponse<ReservationRequest>>(`${routes.finish}`, {id: id});
}

export default {
  getAllProposalByToken, getAllRequestByToken,
  getAllMemoryProposalByToken, getAllMemoryRequestByToken,
  getRequestById, getProposalById,
  finishReservation
}