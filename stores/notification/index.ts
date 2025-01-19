import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputNotificationAdd, Notification } from "~/services/notification/types";

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  function initNotifications(data: Notification[]) {
    notifications.value = data;
  }

  function removeNotification(id: number) {
    const idx = notifications.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    notifications.value.splice(idx , 1);
    notifications.value = [...notifications.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.notifications.getAll();
      if (status === 200) {
        initNotifications(data.content);
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

  async function dispatchAdd(input : InputNotificationAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.notifications.addNotification(input);
      if (status === 201) {
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

  async function dispatchDeleteById(notificationId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.notifications.deleteById(notificationId);
      if (status === 200) {
        removeNotification(notificationId);
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

  return { notifications, dispatchGetAll, dispatchAdd , dispatchDeleteById};
})