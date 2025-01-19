import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputSpecieAdd, InputSpecieUpdate, Specie, SpecieAdmin } from "~/services/specie/types";

export const useSpecieStore = defineStore('specie', () => {
    const species = ref<Specie[]>([]);
    const speciesAdmin = ref<SpecieAdmin[]>([]);

    function initSpecies(data: Specie[]) {
        species.value = data;
    }

    function initSpeciesAdmin(data: SpecieAdmin[]) {
        speciesAdmin.value = data;
    }

    function addNewSpecie(newSpecie: SpecieAdmin) {
        speciesAdmin.value.push(newSpecie);
        speciesAdmin.value = [...speciesAdmin.value];
    }

    function removeSpecie(id: number) {
        const idx = speciesAdmin.value.findIndex(s => s.id === id);
        if (idx === -1) return;
        speciesAdmin.value.splice(idx , 1);
        speciesAdmin.value = [...speciesAdmin.value];
    }

    async function dispatchGetAll(): Promise<APIResponse<null>> {
        try {
            const { status, data } = await API.species.getAll();
            if (status === 200) {
                initSpecies(data.content);
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

    async function dispatchGetAllAdmin(): Promise<APIResponse<null>> {
        try {
            const { status, data } = await API.species.getAllAdmin();
            if (status === 200) {
                initSpeciesAdmin(data.content);
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

    async function dispatchGetAllByType(typeId : number): Promise<APIResponse<null>> {
        try {
            const { status, data } = await API.species.getAllByType(typeId);
            if (status === 200) {
                initSpecies(data.content);
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

    async function dispatchUpdate(input : InputSpecieUpdate): Promise<APIResponse<null>> {
        try {
            const { status,data } = await API.species.updateSpecie(input);
            removeSpecie(input.id)
            addNewSpecie(data.content);
            if (status === 200) {
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            console.log(error)
            const _error = error as AxiosError<string>;

            if(_error.status === 409) {
                //todo conflict
            } else if(_error.status === 400) {
                //todo no id
            }

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

    async function dispatchAdd(input : InputSpecieAdd): Promise<APIResponse<null>> {

        try {
            const { status, data } = await API.species.addSpecie(input);
            if (status === 201) {
                addNewSpecie(data.content);
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            console.log(error)
            const _error = error as AxiosError<string>;

            if(_error.status === 409) {
                //todo conflict
            }

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

    async function dispatchDeleteById(specieId : number): Promise<APIResponse<null>> {
        try {
            const { status } = await API.species.deleteById(specieId);
            if (status === 200) {
                removeSpecie(specieId);
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            console.log(error)
            const _error = error as AxiosError<string>;

            if(_error.status === 400) {
                //todo no id
            }

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


    return { species, speciesAdmin, dispatchGetAll, dispatchGetAllAdmin, dispatchGetAllByType, dispatchUpdate, dispatchAdd , dispatchDeleteById};
})