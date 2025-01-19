import {defineStore} from "pinia";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { Account } from "~/services/user/types";
import { ref } from "vue";

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account | null>(null);

  function initAccount(data: Account){
    account.value = data;
  }

  async function dispatchGet() {
    try {
      const { status, data } = await API.users.getAccount();
      if (status === 200) {
        initAccount(data.content);

        return {
          success: true,
          content: null,
        };
      }
      if (status === 400) {
        //todo quand erreur soit existe pas soit mdp erreur
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

  }

  async function dispatchUpdateUserImage(avatar: any): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserImage(avatar);
      if (status === 200) {
        initAccount(data.content);
        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
        //todo conflict
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

  async function dispatchUpdateUserName(userName: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserName(userName);
      if (status === 200) {
        initAccount(data.content);

        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
        //todo conflict
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

  async function dispatchUpdateUserEmail(email: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserEmail(email);
      if (status === 200) {
        initAccount(data.content);

        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
        //todo conflict
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

  async function dispatchUpdateUserPhoneNumber(phoneNumber: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserPhoneNumber(phoneNumber);
      if (status === 200) {
        initAccount(data.content);

        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
        //todo conflict
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

  async function dispatchUpdateUserFirstName(firstName: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserFirstName(firstName);
      if (status === 200) {
        initAccount(data.content);

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


  async function dispatchUpdateUserLastName(lastName: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserLastName(lastName);
      if (status === 200) {
        initAccount(data.content);

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

  async function dispatchUpdateUserPassword(password: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUserPassword(password);
      if (status === 200) {
        initAccount(data.content);

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


  return { account, dispatchGet,
    dispatchUpdateUserImage, dispatchUpdateUserName, dispatchUpdateUserEmail, dispatchUpdateUserPhoneNumber, dispatchUpdateUserFirstName, dispatchUpdateUserLastName, dispatchUpdateUserPassword };
})