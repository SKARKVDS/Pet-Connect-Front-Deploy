import type { Pet } from "~/services/pet/types";
import type { Address } from '../address/types';

export type RequestSend = {
  id: number,
  typeName: string,
  userName: string,
  pets: string[],
  address: string,
  startTime: number,
  endTime: number,
  isAccepted: boolean,
};


export type RequestReceive = {
  id: number,
  typeName: string,
  userName: string,
  pets: string[],
  address: string,
  startTime: number,
  endTime: number,
};


export type InputRequestAdd = {
  proposalId: number,
  pets: number[],
  address: Address | null,
  times: {start: number, end: number},
};
