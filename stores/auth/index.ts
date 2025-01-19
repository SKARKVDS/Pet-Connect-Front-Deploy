import {defineStore} from "pinia";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {InputUserAdd, InputUserUpdate} from "~/services/user/types";

export const useAuthStore = defineStore('auth', () => {

  function initUserToken(userToken: string){
    const token = useCookie("token")
    token.value = userToken
  }

  function logout(): void {
    const token = useCookie("token")
    token.value = null
  }

  async function dispatchLogin(email : string, password : string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.login(email, password);
      if (status === 200) {
        initUserToken(data.content.token);

        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
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

    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchUpdate(input : InputUserUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.updateUser(input);
      if (status === 200) {
        initUserToken(data.content.token);
        return {
          success: true,
          content: null,
        };
      }
      if (status === 409) {
        //todo conflitct
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

  async function dispatchAdd(input : InputUserAdd): Promise<APIResponse<null>> {
    try {
      const formData = new FormData();

      // Ajouter les champs du formulaire
      formData.append("email", input.email);
      formData.append("userName", input.userName);
      formData.append("firstName", input.firstName);
      formData.append("lastName", input.lastName);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("avatar", input.avatar);

      const { status, data } = await API.users.addUser(input);
      if (status === 201) {
        console.log(data)
        initUserToken(data.content.token);
        return {
          success: true,
          content: null,
        };
      }
      if(status === 400){
        //todo quand erreur soit email username ou phonenumber
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


  return { logout, dispatchLogin, dispatchUpdate, dispatchSignUp: dispatchAdd }
})