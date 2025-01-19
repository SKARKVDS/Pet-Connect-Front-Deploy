import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputRaceAdd, InputRaceUpdate, Race } from "~/services/race/types";

export const useRaceStore = defineStore('race', () => {
  const races = ref<Race[]>([]);

  function initRaces(data: Race[]) {
    races.value = data;
  }

  function addNewRace(newRace: Race) {
    races.value.push(newRace);
    races.value = [...races.value];
  }

  function removeRace(id: number) {
    const idx = races.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    races.value.splice(idx , 1);
    races.value = [...races.value];
  }

  async function dispatchGetAllBySpecie(specieId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.races.getAllBySpecie(specieId);
      if (status === 200) {
        initRaces(data.content);
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

  async function dispatchUpdate(input : InputRaceUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.races.updateRace(input);
      if (status === 200) {
        removeRace(input.id)
        addNewRace(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      if(_error.status === 400) {
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

  async function dispatchAdd(input : InputRaceAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.races.addRace(input);
      if (status === 201) {
        addNewRace(data.content);
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

  async function dispatchDeleteById(raceId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.races.deleteById(raceId);
      if (status === 200) {
        removeRace(raceId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      if(_error.status === 400) {
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

  return { races, dispatchGetAllBySpecie, dispatchUpdate, dispatchAdd, dispatchDeleteById }
})