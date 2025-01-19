import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputVaccineAdd, InputVaccineUpdate, Vaccine } from "~/services/vaccine/types";

export const useVaccineStore = defineStore('vaccine', () => {
  const vaccines = ref<Vaccine[]>([]);

  function initVaccines(data: Vaccine[]) {
    vaccines.value = data;
  }

  function addNewVaccine(newVaccine: Vaccine) {
    vaccines.value.push(newVaccine);
    vaccines.value = [...vaccines.value];
  }

  function removeVaccine(id: number) {
    const idx = vaccines.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    vaccines.value.splice(idx , 1);
    vaccines.value = [...vaccines.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccines.getAll();
      if (status === 200) {
        initVaccines(data.content);
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

  async function dispatchUpdate(input : InputVaccineUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccines.updateVaccine(input);
      if (status === 200) {
        removeVaccine(input.id)
        addNewVaccine(data.content);
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

  async function dispatchAdd(input : InputVaccineAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccines.addVaccine(input);
      if (status === 201) {
        addNewVaccine(data.content);
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

  async function dispatchDeleteById(vaccineId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.vaccines.deleteById(vaccineId);
      if (status === 200) {
        removeVaccine(vaccineId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
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



  return { vaccines, dispatchGetAll, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})