import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {Sex} from "~/services/sex/types";
import type { InputMemoryAdd, Memory } from "~/services/memory/types";
import proposal from "~/services/proposal";
import type { Race } from "~/services/race/types";

export const useMemoryStore = defineStore('memory', () => {
  const memories = ref<Memory[]>([]);

  function initMemories(data: Memory[]) {
    memories.value = data;
  }

  function addNewMemory(newMemory: Memory) {
    memories.value.push(newMemory);
    memories.value = [...memories.value];
  }

  function removeMemory(id: number) {
    const idx = memories.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    memories.value.splice(idx , 1);
    memories.value = [...memories.value];
  }

  async function dispatchGetAllByProposalId(reservationId: number): Promise<APIResponse<Memory[]>> {
    try {
      const { status, data } = await API.memories.getAllByReservationId(reservationId);
      if (status === 200) {
        initMemories(data.content);
        return {
          success: true,
          content: data.content,
        };
      }
    } catch (error) {
      console.log(error)
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

  async function dispatchAddMemory(input: InputMemoryAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.memories.addMemory(input);
      if (status === 201) {
        addNewMemory(data.content);
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
      });
    }
    return Promise.reject({
      success: false,
      content: null,
      status: 400,
    });
  }

  async function dispatchDeleteById(id: string): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.memories.deleteById(id);
      if (status === 200) {
        removeMemory(Number(id));
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
      });
    }
    return Promise.reject({
      success: false,
      content: null,
      status: 400,
    });
  }

  return { memories, dispatchGetAllByProposalId, dispatchAddMemory, dispatchDeleteById }
})