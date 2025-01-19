import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputPlanificationAdd, Planification } from "~/services/planification/types";

export const usePlanificationStore = defineStore('planification', () => {
  const planifications = ref<Planification[]>([]);
  const planification = ref<Planification>();

  function initPlanifications(data: Planification[]) {
    console.log(data)
    planifications.value = data;
  }

  function initPlanification(data: Planification){
    planification.value = data;
  }

  function addNewPlanification(newPlanification: Planification) {
    planifications.value.push(newPlanification);
  }

  /*function removePlanification(id: number) {
    const idx = planifications.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    planifications.value.splice(idx , 1);
  }*/

  async function dispatchGetAllByProposalId(proposalId: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.planifications.getAllByProposalId(proposalId);
      console.log(data.content)
      if (status === 200) {

        initPlanifications(data.content);
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


  async function dispatchAdd(input : InputPlanificationAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.planifications.addPlanifications(input);
      if (status === 200) {
        //addNewPlanification(data.content);
        return {
          success: true,
          content: null
        }
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      return Promise.reject({
        success: false,
        status: _error.response?.status,
        content: null,
      });
    }

    return Promise.reject({
      success: false,
      content: null,
      status: 400,
    })
  }




  return { planifications, planification, dispatchGetAllByProposalId,
    dispatchAdd }
})