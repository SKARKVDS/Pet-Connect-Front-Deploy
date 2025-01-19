import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import {AxiosError} from "axios";
import {defineStore} from "pinia";
import { boolean } from "yup";

export const useTokenStore = defineStore('token', () => {


    async function dispatchCheckToken(): Promise<APIResponse<null>> {
        const token = useCookie("token").value as string

        try {
            const {status} = await API.users.checkToken(token);
            if (status === 200) {
                console.log("good");
                //todo token good
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

    async function dispatchCheckTokenAdmin(): Promise<APIResponse<null>> {
        console.log("check admin");
        try {
            const {status} = await API.users.checkTokenAdmin();
            if (status === 200) {

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


    return { dispatchCheckToken, dispatchCheckTokenAdmin }
})
