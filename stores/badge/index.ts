import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { Badge, InputBadgeAdd, InputBadgeUpdateAttributs, InputBadgeUpdateImage } from "~/services/badge/types";
import type { InputPetAdd } from "~/services/pet/types";

export const useBadgeStore = defineStore('badge', () => {
  const badges = ref<Badge[]>([]);

  function initBadges(data: Badge[]) {
    badges.value = data;
  }

  function addNewBadge(newBadge: Badge) {
    badges.value.push(newBadge);
    badges.value = [...badges.value];
  }

  function removeBadge(id: number) {
    const idx = badges.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    badges.value.splice(idx , 1);
    badges.value = [...badges.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.badges.getAll();
      if (status === 200) {
        initBadges(data.content);
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

  async function dispatchUpdateAttributes(input : InputBadgeUpdateAttributs): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.badges.updateBadgeAttributes(input);
      if (status === 200) {
        removeBadge(input.id)
        addNewBadge(data.content);
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

  async function dispatchUpdateImage(input : InputBadgeUpdateImage): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.badges.updateBadgeImage(input);
      if (status === 200) {
        removeBadge(input.id)
        addNewBadge(data.content);
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

  async function dispatchAdd(input : InputBadgeAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.badges.addBadge(input);
      if (status === 201) {
        addNewBadge(data.content);
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

  async function dispatchDeleteById(badgeId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.badges.deleteById(badgeId);
      if (status === 200) {
        removeBadge(badgeId);
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

  return { badges, dispatchGetAll, dispatchUpdateAttributes, dispatchUpdateImage, dispatchAdd, dispatchDeleteById };
})