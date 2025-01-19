import type { APIResponse } from "~/services/types";
import type { InputForumAdd, InputForumUpdate, Forum } from "~/services/forum/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
  return await axios.get<APIResponse<Forum[]>>(routes.getAll);
}

async function getByTopicId(topicId: number) {
  return await axios.get<APIResponse<Forum>>(`${routes.getByTopicId}${topicId}`);
}

async function updateForum(input: InputForumUpdate) {
  return await axios.put<APIResponse<Forum>>(routes.update, input);
}

async function addForum(input: InputForumAdd) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios.post<APIResponse<Forum>>(routes.add, input , config);
}

async function deleteById(forumId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${forumId}`);
}

export default {
  getAll,
  getByTopicId,
  updateForum,
  addForum,
  deleteById,
}