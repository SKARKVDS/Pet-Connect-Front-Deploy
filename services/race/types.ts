export type Race = {
  id: number,
  name: string,
  specieId : number
};

export type InputRaceAdd = {
  name: string
  specieId : number
};

export type InputRaceUpdate = {
  id: number,
  name: string,
  specieId : number
};