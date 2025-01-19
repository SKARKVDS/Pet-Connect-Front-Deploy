import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type { InputPetAdd, InputPetUpdate, InputPetUpdateImage, Pet, PetAdmin } from "~/services/pet/types";

export const usePetStore = defineStore('pet', () => {
  const pets = ref<Pet[]>([]);
  const petsAdmin = ref<PetAdmin[]>([]);

  function initPets(data: Pet[]) {
    pets.value = data;
  }

  function initPetAdmins(data: PetAdmin[]) {
    petsAdmin.value = data;
  }

  function addNewPet(newPet: Pet) {
    pets.value.push(newPet);
    pets.value = [...pets.value];
  }

  function removePet(id: number) {
    const idx = pets.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    pets.value.splice(idx , 1);
    pets.value = [...pets.value];
  }


  function addNewPetAdmin(newPetAdmin: PetAdmin) {
    petsAdmin.value.push(newPetAdmin);
    petsAdmin.value = [...petsAdmin.value];
  }

  function removePetAdmin(id: number) {
    const idx = petsAdmin.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    petsAdmin.value.splice(idx , 1);
    petsAdmin.value = [...petsAdmin.value];
  }

  async function dispatchGetAllByToken(): Promise<APIResponse<null>> {
    const token = useCookie("token").value as string;

    try {
      const { status, data } = await API.pets.getAllByToken(token);
      if (status === 200) {
        console.log(data);

        initPets(data.content);
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

  async function dispatchGetAllByUserIdAdmin(userId: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.getAllByUserIdAdmin(userId);
      if (status === 200) {
        initPetAdmins(data.content);
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


  async function dispatchUpdate(input : InputPetUpdate): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.updatePet(input);
      if (status === 200) {
        removePet(input.id)
        addNewPet(data.content)
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchUpdateImage(input : InputPetUpdateImage): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.updatePetImage(input);
      if (status === 200) {
        removePet(input.id)
        addNewPet(data.content)
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchUpdateAdmin(input : InputPetUpdate): Promise<APIResponse<null>> {
    console.log(input)
    try {
      const { status, data } = await API.pets.updatePetAdmin(input);
      if (status === 200) {
        removePetAdmin(input.id)
        addNewPetAdmin(data.content)
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchResetImageAdmin(petId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.resetPetImageAdmin(petId);
      if (status === 200) {
        removePetAdmin(petId);
        addNewPetAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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


  async function dispatchActivateAdmin(petId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.activatePetAdmin(petId);
      if (status === 200) {
        removePetAdmin(petId);
        addNewPetAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchDisableAdmin(petId : number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.disablePetAdmin(petId);
      if (status === 200) {
        removePetAdmin(petId);
        addNewPetAdmin(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchDisable(petId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.pets.disablePet(petId);
      if (status === 200) {
        removePet(petId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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

  async function dispatchAdd(input : InputPetAdd): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.pets.addPet(input);
      if (status === 201) {
        addNewPet(data.content);
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

  async function dispatchDeleteByIdAdmin(petId : number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.pets.deleteByIdAdmin(petId);
      if (status === 200) {
        removePetAdmin(petId);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      if(_error.status === 403) {
        //todo unAuthorize
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




  return { pets, petsAdmin,
    dispatchGetAllByToken, dispatchGetAllByUserIdAdmin,
    dispatchUpdate, dispatchUpdateImage, dispatchUpdateAdmin, dispatchActivateAdmin, dispatchDisableAdmin,dispatchResetImageAdmin, dispatchDisable,
    dispatchAdd,
    dispatchDeleteByIdAdmin }
})