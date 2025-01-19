import type { APIResponse } from "~/services/types";
import type {
  InputProposalAdd,
  InputProposalAdminUpdate,
  InputProposalUpdate,
  Proposal,
  ProposalAdmin,
} from "~/services/proposal/types";

import axios from "../api"
import { routes } from "./routes";
import type { PetAdmin } from "~/services/pet/types";

async function getAllByToken(token : string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.get<APIResponse<Proposal[]>>(`${routes.getAllByToken}`, config);
}

async function getAllByUserIdAdmin(userId : number) {
  return await axios.get<APIResponse<ProposalAdmin[]>>(`${routes.getAllByUserIdAdmin}${userId}`);
}


async function updateProposalAdmin(input: InputProposalAdminUpdate) {
  return await axios.put<APIResponse<ProposalAdmin>>(routes.updateAdmin, input);
}

async function activateProposalAdmin(proposalId: number) {
  return await axios.put<APIResponse<ProposalAdmin>>(routes.activateAdmin, {id : proposalId});
}

async function disableProposalAdmin(proposalId: number) {
  return await axios.put<APIResponse<ProposalAdmin>>(routes.disableAdmin, {id : proposalId});
}

async function disableProposal(proposalId: number) {
  return await axios.put<APIResponse<Proposal>>(routes.disable, {id : proposalId});
}

async function addProposal(input: InputProposalAdd, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  return await axios.post<APIResponse<Proposal>>(routes.add, input , config);
}

async function deleteByIdAdmin(proposalId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteByIdAdmin}${proposalId}`);
}

export default {
  getAllByToken,
  getAllByUserIdAdmin,
  updateProposalAdmin,
  activateProposalAdmin, disableProposalAdmin, disableProposal,
  addProposal,
  deleteByIdAdmin,
}