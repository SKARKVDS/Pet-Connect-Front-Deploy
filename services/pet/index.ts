import type { APIResponse } from "~/services/types";
import type { InputPetAdd, InputPetUpdate, InputPetUpdateImage, Pet, PetAdmin } from "~/services/pet/types";

import axios from "../api"
import { routes } from "./routes";
import config from "tailwindcss/defaultConfig";

async function getAllByToken(token : string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.get<APIResponse<Pet[]>>(`${routes.getAllByToken}`, config);
}


async function getAllByUserIdAdmin(userId : number) {
  return await axios.get<APIResponse<PetAdmin[]>>(`${routes.getAllByUserIdAdmin}${userId}`);
}

async function updatePet(input: InputPetUpdate) {

  return await axios.put<APIResponse<Pet>>(routes.update, input);
}

async function updatePetImage(input: InputPetUpdateImage) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return await axios.put<APIResponse<Pet>>(routes.updateImage, input, config);
}

async function updatePetAdmin(input: InputPetUpdate) {
  return await axios.put<APIResponse<PetAdmin>>(routes.updateAdmin, input);
}

async function resetPetImageAdmin(petId: number) {
  return await axios.put<APIResponse<PetAdmin>>(routes.resetImageAdmin, {id : petId});
}

async function activatePetAdmin(petId: number) {
  return await axios.put<APIResponse<PetAdmin>>(routes.activateAdmin, {id : petId});
}

async function disablePetAdmin(petId: number) {
  return await axios.put<APIResponse<PetAdmin>>(routes.disableAdmin, {id : petId});
}

async function disablePet(petId: number) {
  return await axios.put<APIResponse<PetAdmin>>(routes.disable, {id : petId});
}

async function addPet(input: InputPetAdd) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post<APIResponse<Pet>>(routes.add, input, config);
}

async function deleteByIdAdmin(petId: number) {
  return await axios.delete<APIResponse<boolean>>(`${routes.deleteByIdAdmin}${petId}`);
}


export default {
  getAllByToken, getAllByUserIdAdmin,
  updatePet, updatePetImage, updatePetAdmin, resetPetImageAdmin, activatePetAdmin, disablePetAdmin, disablePet,
  addPet,
  deleteByIdAdmin,
}