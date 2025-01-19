import {defineStore} from "pinia";
import type {APIResponse} from "~/services/types";
import type {Service} from "~/services/service/types";
import type {AxiosError} from "axios";
import { API } from "~/services";

export const useServiceStore = defineStore('service', () => {
    async function dispatchGetAllByTimestamp(timestamp: number): Promise<APIResponse<Service[]>> {
        try {
            const { status, data } = await API.services.getAllByTimestamp(timestamp);
            if (status === 200) {
                return {
                    status: status,
                    success: true,
                    content: data.content,
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return Promise.reject({
                success: false,
                status: _error.response?.status,
                content: null,
            })
        }
        return Promise.reject({
            success: false,
            content: null,
            status: 400,
        });
    }




    return {
        dispatchGetAllByTimestamp
    }
})