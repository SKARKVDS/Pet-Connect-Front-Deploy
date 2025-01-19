import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputForumAdd, InputForumUpdate, Forum} from "~/services/forum/types";

export const useForumStore = defineStore('forum', () => {
  const forums = ref<Forum[]>([]);
  const forum = ref<Forum>();

  function initForums(data: Forum[]) {
    forums.value = data;
  }

  function initForum(data: Forum) {
    forum.value = data;
  }

  function addNewForum(newForum: Forum) {
    forums.value.push(newForum);
    forums.value = [...forums.value];
  }

  function removeForum(id: number) {
    const idx = forums.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    forums.value.splice(idx , 1);
    forums.value = [...forums.value];
  }

  async function dispatchGetAll(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.forums.getAll();
      if (status === 200) {
        initForums(data.content);
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


  async function dispatchGetByTopicId(topicId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.forums.getByTopicId(topicId);
      if (status === 200) {
        initForum(data.content);
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

  async function dispatchUpdate(input : InputForumUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.forums.updateForum(input);
      if (status === 200) {
        removeForum(input.id);
        addNewForum(data.content);

        return {
          success: true,
          content: null,
        };
      }
      if(status === 409) {
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

  async function dispatchAdd(input : InputForumAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.forums.addForum(input);
      if (status === 201) {
        addNewForum(data.content);
        return {
          success: true,
          content: null,
        };
      }
      if(status === 409) {
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

  async function dispatchDeleteById(forumId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.forums.deleteById(forumId);
      if (status === 200) {
        removeForum(forumId);
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



  return { forums, forum, dispatchGetAll, dispatchGetByTopicId, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})