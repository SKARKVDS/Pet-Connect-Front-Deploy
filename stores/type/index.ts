import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputTypeAdd, InputTypeUpdate, Type, TypeAdmin } from "~/services/type/types";

export const useTypeStore = defineStore('type', () => {
  const types = ref<Type[]>([]);
  const typesAdmin = ref<TypeAdmin[]>([]);
  const type = ref<Type>();

  function initTypes(data: Type[]) {
    types.value = data;
  }

  function initTypesAdmin(data: TypeAdmin[]) {
    typesAdmin.value = data;
  }

  function initType(data: Type){
    type.value = data;
  }

  function addNewTypeAdmin(newType: TypeAdmin) {
    typesAdmin.value.push(newType);
    typesAdmin.value = [...typesAdmin.value];
  }

  function removeTypeAdmin(id: number) {
    const idx = typesAdmin.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    typesAdmin.value.splice(idx , 1);
    typesAdmin.value = [...typesAdmin.value];
  }

  async function dispatchGetAllAdmin(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.types.getAllAdmin();
      if (status === 200) {
        initTypesAdmin(data.content);
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


  async function dispatchGetAll(): Promise<APIResponse<Type[] | null>> {
    try {
      const { status, data } = await API.types.getAll();
      if (status === 200) {
        initTypes(data.content);
        return {
          success: true,
          content: data.content,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;
      return Promise.reject({
        success: false,
        status: _error.response?.status,
        content: null,
      });
    }
    return Promise.reject({
      success: false,
      content: null,
      status: 400,
    });
  }

  async function dispatchGetById(typeId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.types.getById(typeId);
      if (status === 200) {
        initType(data.content);
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


  async function dispatchUpdate(input : InputTypeUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.types.updateType(input);
      if (status === 200) {
        removeTypeAdmin(input.id)
        addNewTypeAdmin(data.content);
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

  async function dispatchAdd(input : InputTypeAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.types.addType(input);
      if (status === 201) {
        addNewTypeAdmin(data.content);
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

  async function dispatchDeleteById(typeId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.types.deleteById(typeId);
      if (status === 200) {
        removeTypeAdmin(typeId);
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



  return { types, typesAdmin, type, dispatchGetAllAdmin, dispatchGetAll, dispatchGetById, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})