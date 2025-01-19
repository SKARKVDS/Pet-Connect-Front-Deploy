import type { APIResponse } from "~/services/types";
import type { InputPostAdd, InputPostUpdate, Post } from "~/services/post/types";

import axios from "../api"
import { routes } from "./routes";


async function getAllByTopicId(topicId: number) {
  return await axios.get<APIResponse<Post[]>>(`${routes.getAllByTopicId}${topicId}`);
}

async function updatePost(input: InputPostUpdate) {
  return await axios.put<APIResponse<Post>>(routes.update, input);
}

async function addPost(input: InputPostAdd, token: string) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  };
  return await axios.post<APIResponse<Post>>(routes.add, input, config);
}

async function deleteById(postId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${postId}`);
}

export default {
  getAllByTopicId,
  updatePost,
  addPost,
  deleteById,
}