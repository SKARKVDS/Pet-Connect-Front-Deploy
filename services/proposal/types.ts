import type { Address } from '../address/types';

export type Proposal = {
  id: number,
  description: string,
  typeName: string,
  address: Address | null,
  species: string[],
};


export type ProposalAdmin = {
  id: number,
  description: string,
  typeName: string,
  address: Address | null,
  speciesName: string[],
  countPlanification: number,
  isDisable: boolean,
};


export type InputProposalAdd = {
  description: string;
  typeId: number;
  address?: Address;
  species : number[];
};

export type InputProposalUpdate = {
  id: number,
  startDateTime : number,
  endDateTime : number,
  typeId: number,
  address: Address | null,
  frequencyId: number | null,
  species : number[]
};

export type InputProposalAdminUpdate = {
  id: number,
  description: string,
};