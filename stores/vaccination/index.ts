import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {
  InputVaccinationAdd,
  InputVaccinationUpdate,
  Vaccination,
  VaccinationDashBoard,
} from "~/services/vaccination/types";

export const useVaccinationStore = defineStore('vaccination', () => {
  const vaccinations = ref<Vaccination[]>([]);
  const vaccinationsDashboard = ref<VaccinationDashBoard[]>([]);

  function initVaccinations(data: Vaccination[]) {
    vaccinations.value = data;
  }

  function initVaccinationsDashboard(data: VaccinationDashBoard[]) {
    vaccinationsDashboard.value = data;
  }

  function addNewVaccination(newVaccination: Vaccination) {
    vaccinations.value.push(newVaccination);
    vaccinations.value = [...vaccinations.value];
  }

  function removeVaccination(id: number) {
    const idx = vaccinations.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    vaccinations.value.splice(idx , 1);
    vaccinations.value = [...vaccinations.value];
  }

  async function dispatchGetAllFutureByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccinations.getAllFutureByToken();
      if (status === 200) {
        initVaccinationsDashboard(data.content);
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

  async function dispatchGetAllByPet(petId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccinations.getAllByPet(petId);
      if (status === 200) {
        initVaccinations(data.content);
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

  async function dispatchUpdate(input : InputVaccinationUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccinations.updateVaccination(input);
      if (status === 200) {
        removeVaccination(input.id)
        addNewVaccination(data.content);
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

  async function dispatchAdd(input : InputVaccinationAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.vaccinations.addVaccination(input);
      if (status === 201) {
        addNewVaccination(data.content);
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

  async function dispatchDeleteById(vaccinationId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.vaccinations.deleteById(vaccinationId);
      if (status === 200) {
        removeVaccination(vaccinationId);
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



  return { vaccinations, vaccinationsDashboard, dispatchGetAllFutureByToken, dispatchGetAllByPet, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})