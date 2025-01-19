import type { APIResponse } from "~/services/types";
import type { InputTopicAdd, InputTopicUpdate, Topic } from "~/services/topic/types";

import axios from "../api"
import { routes } from "./routes";


async function getAllByForumId(forumId: number) {
  return await axios.get<APIResponse<Topic[]>>(`${routes.getAllByForumId}${forumId}`);
}

async function updateTopic(input: InputTopicUpdate) {
  return await axios.put<APIResponse<Topic>>(routes.update, input);
}

async function addTopic(input: InputTopicAdd, token: string) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  };
  return await axios.post<APIResponse<Topic>>(routes.add, input, config);
}

async function deleteById(forumId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${forumId}`);
}

export default {
  getAllByForumId,
  updateTopic,
  addTopic,
  deleteById,
}