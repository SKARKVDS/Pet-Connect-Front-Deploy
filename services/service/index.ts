import type { APIResponse } from "~/services/types";

import axios from "../api"
import type {Service } from "~/services/service/types";
import { routes } from "./routes";

async function getAllByTimestamp(timestamp : number) {
    return await axios.get<APIResponse<Service[]>>(routes.getAllByTimestamp(timestamp));
}

export default {
    getAllByTimestamp
}