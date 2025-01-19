export type Vaccine = {
  id: number,
  name: string,
  needBooster: boolean,
};

export type InputVaccineAdd = {
  name: string
  needBooster: boolean,
};

export type InputVaccineUpdate = {
  id: number,
  name: string
  needBooster: boolean,
};