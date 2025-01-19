import type { APIResponse } from "~/services/types";
import type { InputForumAdd, InputForumUpdate, Forum } from "~/services/forum/types";

import axios from "../api"
import { routes } from "./routes";
import type { Badge, InputBadgeAdd, InputBadgeUpdateAttributs, InputBadgeUpdateImage } from "~/services/badge/types";

async function getAll() {
  return await axios.get<APIResponse<Badge[]>>(routes.getAll);
}

async function updateBadgeAttributes(input: InputBadgeUpdateAttributs) {
  return await axios.put<APIResponse<Badge>>(routes.updateAttributes, input);
}

async function updateBadgeImage(input: InputBadgeUpdateImage) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.put<APIResponse<Badge>>(routes.updateImage, input , config);
}

async function addBadge(input: InputBadgeAdd) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post<APIResponse<Badge>>(routes.add, input , config);
}

async function deleteById(badgeId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteById}${badgeId}`);
}

export default {
  getAll,
  updateBadgeAttributes,
  updateBadgeImage,
  addBadge,
  deleteById
}