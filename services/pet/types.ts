import type {Race} from "~/services/race/types";
import type {Sex} from "~/services/sex/types";
import type { User } from "~/services/user/types";

export type Pet = {
  id: number,
  nickName: string,
  birthDate: number,
  identification : string,
  race : string,
  specie : string,
  sex : string,
  url: any
};

export type PetAdmin = {
  id: number,
  nickName: string,
  birthDate: number,
  identification : string,
  race : string,
  specie : string,
  sex : string,
  url: string,
  isDisable: boolean,
};

export type InputPetAdd = {
  nickName: string,
  birthDate: number,
  identification : string,
  raceId : string,
  specieId : string,
  sexId : string,
  race : string,
  specie : string,
  sex : string,
  avatar: any
};

export type InputPetUpdate = {
  id: number,
  nickName: string,
  birthDate: number,
  identification : string,
  raceId : string,
  specieId : string,
  sexId : string,
  race : string,
  specie : string,
  sex : string,
};

export type InputPetUpdateImage = {
  id: number,
  avatar: any
};