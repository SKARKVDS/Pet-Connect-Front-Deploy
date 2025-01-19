import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {
  InputProposalAdd,
  InputProposalAdminUpdate,
  InputProposalUpdate,
  Proposal,
  ProposalAdmin,
} from "~/services/proposal/types";

export const useProposalStore = defineStore('proposal', () => {
  const proposals = ref<Proposal[]>([]);
  const proposalsAdmin = ref<ProposalAdmin[]>([]);
  const proposal = ref<Proposal>();

  function initProposals(data: Proposal[]) {
    proposals.value = data;
  }

  function initProposalsAdmin(data: ProposalAdmin[]) {
    proposalsAdmin.value = data;
  }

  function initProposal(data: Proposal){
    proposal.value = data;
  }

  function addNewProposal(newProposal: Proposal) {
    proposals.value.push(newProposal);
  }

  function removeProposal(id: number) {
    const idx = proposals.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    proposals.value.splice(idx , 1);
  }

  function addNewProposalAdmin(newProposalAdmin: ProposalAdmin) {
    proposalsAdmin.value.push(newProposalAdmin);
    proposalsAdmin.value = [...proposalsAdmin.value];
  }

  function removeProposalAdmin(id: number) {
    const idx = proposalsAdmin.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    proposalsAdmin.value.splice(idx , 1);
    proposalsAdmin.value = [...proposalsAdmin.value];
  }

  async function dispatchGetAllByToken(): Promise<APIResponse<null>> {
    const token = useCookie("token").value as string;

    try {
      const { status, data } = await API.proposals.getAllByToken(token);
      if (status === 200) {
        console.log(data);
        initProposals(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetAllByUserIdAdmin(userId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.proposals.getAllByUserIdAdmin(userId);
      if (status === 200) {
        initProposalsAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchUpdateAdmin(input : InputProposalAdminUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.proposals.updateProposalAdmin(input);
      if (status === 200) {
        removeProposalAdmin(input.id);
        addNewProposalAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
      } else if(_error.status === 400) {
        //todo no id
      }

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchActivateAdmin(proposalId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.proposals.activateProposalAdmin(proposalId);
      if (status === 200) {
        removeProposalAdmin(proposalId);
        addNewProposalAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
      } else if(_error.status === 400) {
        //todo no id
      }

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchDisableAdmin(proposalId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.proposals.disableProposalAdmin(proposalId);
      if (status === 200) {
        removeProposalAdmin(proposalId);
        addNewProposalAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
      } else if(_error.status === 400) {
        //todo no id
      }

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchDisable(proposalId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.proposals.disableProposal(proposalId);
      if (status === 200) {
        removeProposal(proposalId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
      } else if(_error.status === 400) {
        //todo no id
      }

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchAdd(input : InputProposalAdd): Promise<APIResponse<null>> {
    const token = useCookie("token").value as string;
    try {
      const { status, data } = await API.proposals.addProposal(input, token);
      if (status === 201) {
        addNewProposal(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }


  async function dispatchDeleteByIdAdmin(proposalId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.proposals.deleteByIdAdmin(proposalId);
      if (status === 200) {
        removeProposalAdmin(proposalId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
      } else if(_error.status === 400) {
        //todo no id
      }

      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }


  return { proposals, proposalsAdmin, proposal, dispatchGetAllByToken, dispatchGetAllByUserIdAdmin,
    dispatchUpdateAdmin,
    dispatchActivateAdmin, dispatchDisableAdmin,
    dispatchDisable,
    dispatchAdd,
    dispatchDeleteByIdAdmin}
})