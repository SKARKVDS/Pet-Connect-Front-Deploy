import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {Sex} from "~/services/sex/types";
import type { InputRequestAdd, RequestReceive, RequestSend } from "~/services/request/types";

export const useRequestStore = defineStore('request', () => {
  const requestsSend = ref<RequestSend[]>([]);
  const requestsReceive = ref<RequestReceive[]>([]);


  function initRequestsSend(data: RequestSend[]) {
    requestsSend.value = data;
  }

  function initRequestsReceive(data: RequestReceive[]) {
    requestsReceive.value = data;
  }

  function removeRequestsReceive(id: number) {
    const idx = requestsReceive.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    requestsReceive.value.splice(idx , 1);
    requestsReceive.value = [...requestsReceive.value];
  }

  async function dispatchGetAllSendByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.requests.getAllSendByToken();
      if (status === 200) {
        initRequestsSend(data.content);
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


  async function dispatchGetAllReceiveByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.requests.getAllReceiveByToken();
      if (status === 200) {
        initRequestsReceive(data.content);
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

  async function dispatchAcceptRequest(requestId :number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.requests.acceptRequest(requestId);
      if (status === 200) {
        removeRequestsReceive(requestId)
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

  async function dispatchAcceptNoMoreRequest(requestId :number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.requests.acceptNoMoreRequest(requestId);
      if (status === 200) {
        removeRequestsReceive(requestId)
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

  async function dispatchAdd(input : InputRequestAdd): Promise<APIResponse<null>> {
    try {
      const { status } = await API.requests.addRequest(input);
      if (status === 201) {
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      return Promise.reject({
        success: false,
        status: _error.response?.status,
        content: null,
      })
    }
    return Promise.reject({
      success: false,
      content: null,
      status: 400,
    })
  }

  async function dispatchDeleteById(requestId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.requests.deleteById(requestId);
      if (status === 200) {
        removeRequestsReceive(requestId);
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

  return { requestsSend, requestsReceive,
    dispatchGetAllSendByToken, dispatchGetAllReceiveByToken,
    dispatchAcceptRequest, dispatchAcceptNoMoreRequest,
    dispatchAdd,
    dispatchDeleteById
  }
})