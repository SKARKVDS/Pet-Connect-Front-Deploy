import type { APIResponse } from "~/services/types";
import type { Sex } from "~/services/sex/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
  return await axios.get<APIResponse<Sex[]>>(routes.getAll);
}

export default {
  getAll,
}