import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputTopicAdd, InputTopicUpdate, Topic } from "~/services/topic/types";

export const useTopicStore = defineStore('topic', () => {
  const topics = ref<Topic[]>([]);

  function initTopics(data: Topic[]) {
    topics.value = data;
  }

  function addNewTopic(newTopic: Topic) {
    topics.value.push(newTopic);
    topics.value = [...topics.value];
  }

  function removeTopic(id: number) {
    const idx = topics.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    topics.value.splice(idx , 1);
    topics.value = [...topics.value];
  }

  async function dispatchGetAllByForumId(forumId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.topics.getAllByForumId(forumId);
      if (status === 200) {
        initTopics(data.content);
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

  async function dispatchUpdate(input : InputTopicUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.topics.updateTopic(input);
      if (status === 200) {
        removeTopic(input.id)
        addNewTopic(data.content);
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

  async function dispatchAdd(input : InputTopicAdd): Promise<APIResponse<null>> {
    const token = useCookie("token").value as string;

    try {
      const { status, data } = await API.topics.addTopic(input, token);
      if (status === 201) {
        addNewTopic(data.content);
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

  async function dispatchDeleteById(topicId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.topics.deleteById(topicId);
      if (status === 200) {
        removeTopic(topicId);
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



  return { topics, dispatchGetAllByForumId, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})