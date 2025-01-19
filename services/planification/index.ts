import type { APIResponse } from "~/services/types";
import type { InputPostAdd, InputPostUpdate, Post } from "~/services/post/types";

import axios from "../api"
import { routes } from "./routes";
import type { InputPlanificationAdd, Planification } from "~/services/planification/types";

async function getAllByProposalId(proposalId: string) {
  return await axios.get<APIResponse<Planification[]>>(`${routes.getAllByProposalId}${proposalId}`);
}

async function addPlanifications(input: InputPlanificationAdd) {
  return await axios.post<APIResponse<Planification[]>>(routes.addProposals, input);
}

export default {
  getAllByProposalId,
  addPlanifications,
}