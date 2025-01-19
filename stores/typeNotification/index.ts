import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputTypeNotificationAdd, InputTypeNotificationUpdate, TypeNotification } from "~/services/typeNotification/types";

export const useTypeNotificationStore = defineStore('typeNotification', () => {
  const typesNotifications = ref<TypeNotification[]>([]);

  function initTypesNotifications(data: TypeNotification[]) {
    typesNotifications.value = data;
  }

  function addNewTypeNotification(newTypeNotification: TypeNotification) {
    typesNotifications.value.push(newTypeNotification);
    typesNotifications.value = [...typesNotifications.value];
  }

  function removeTypeNotification(id: number) {
    const idx = typesNotifications.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    typesNotifications.value.splice(idx , 1);
    typesNotifications.value = [...typesNotifications.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.typesNotifications.getAll();
      if (status === 200) {
        initTypesNotifications(data.content);
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

  async function dispatchUpdate(input : InputTypeNotificationUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.typesNotifications.updateTypeNotification(input);
      if (status === 200) {
        removeTypeNotification(input.id)
        addNewTypeNotification(data.content);
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

  async function dispatchAdd(input : InputTypeNotificationAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.typesNotifications.addTypeNotification(input);
      if (status === 201) {
        addNewTypeNotification(data.content);
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

  async function dispatchDeleteById(typeNotificationId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.typesNotifications.deleteById(typeNotificationId);
      if (status === 200) {
        removeTypeNotification(typeNotificationId);
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

  return { typesNotifications, dispatchGetAll, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})