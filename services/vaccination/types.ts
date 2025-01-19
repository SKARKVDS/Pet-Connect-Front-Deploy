export type Vaccination = {
  id: number,
  vaccineName: string,
  dateVaccination: number,
  dateBooster: number,
  needBooster: boolean,
  vaccineId: number,
  petId : number
};

export type VaccinationDashBoard = {
  id: number,
  vaccineName: string,
  petName: string,
  dateBooster: number,
  petId : number
};


export type InputVaccinationAdd = {
  vaccineName: string,
  dateVaccination: number,
  dateBooster: number,
  vaccineId: number,
  petId : number
};


export type InputVaccinationUpdate = {
  id: number,
  vaccineName: string,
  dateVaccination: number,
  dateBooster: number,
  vaccineId: number,
  petId : number
};