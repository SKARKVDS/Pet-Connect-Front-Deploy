import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputPostAdd, InputPostUpdate, Post } from "~/services/post/types";

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);

  function initPosts(data: Post[]) {
    posts.value = data;
  }

  function addNewPost(newPost: Post) {
    //posts.value.push(newPost);
    posts.value = [newPost, ...posts.value];
  }

  function removePost(id: number) {
    const idx = posts.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    posts.value.splice(idx , 1);
    posts.value = [...posts.value];
  }

  async function dispatchGetAllByTopicId(topicId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.posts.getAllByTopicId(topicId);
      if (status === 200) {
        initPosts(data.content);
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

  async function dispatchUpdate(input : InputPostUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.posts.updatePost(input);
      if (status === 200) {
        removePost(input.id)
        addNewPost(data.content);
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

  async function dispatchAdd(input : InputPostAdd): Promise<APIResponse<null>> {
    const token = useCookie("token").value as string;
    try {
      const { status, data } = await API.posts.addPost(input, token);
      if (status === 201) {
        addNewPost(data.content);
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

  async function dispatchDeleteById(postId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.posts.deleteById(postId);
      if (status === 200) {
        removePost(postId);
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



  return { posts, dispatchGetAllByTopicId, dispatchUpdate, dispatchAdd , dispatchDeleteById };
})