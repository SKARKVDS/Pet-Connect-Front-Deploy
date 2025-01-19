import type { Specie } from '../specie/types';

export type Type = {
  id: number,
  name: string,
  addressProposal: boolean,
  species: Specie[]
};

export type TypeAdmin = {
  id: number,
  name: string,
  addressProposal: boolean,
  species: number[],
  speciesName: string[]
};

export type InputTypeAdd = {
  name: string,
  addressProposal: boolean,
  species: number[]
};

export type InputTypeUpdate = {
  id: number,
  name: string,
  addressProposal: boolean,
  species: number[]
};