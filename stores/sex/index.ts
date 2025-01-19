import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {Sex} from "~/services/sex/types";

export const useSexStore = defineStore('sex', () => {
  const sexes = ref<Sex[]>([]);

  function initSexes(data: Sex[]) {
    sexes.value = data;
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.sexes.getAll();
      if (status === 200) {
        initSexes(data.content);
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

  return { sexes, dispatchGetAll }
})