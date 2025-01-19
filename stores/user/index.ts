import {defineStore} from "pinia";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputUserUpdateAdmin, User } from "~/services/user/types";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);

  function initUsers(data: User[]){
    users.value = data;
  }

  function addNewUser(newUser: User) {
    users.value.push(newUser);
    users.value = [...users.value];
  }


  function removeUser(id: number) {
    const idx = users.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    users.value.splice(idx , 1);
    users.value = [...users.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.getAll();
      if (status === 200) {
        initUsers(data.content);
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

  async function dispatchUpdateAdmin(input: InputUserUpdateAdmin): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserAdmin(input);
      if (status === 200) {
        removeUser(input.id)
        addNewUser(data.content);
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

  async function dispatchDeleteImageAdmin(userId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.deleteUserImageAdmin(userId);
      if (status === 200) {
        removeUser(userId)
        addNewUser(data.content);
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

  return { users, dispatchGetAll , dispatchUpdateAdmin, dispatchDeleteImageAdmin }
})