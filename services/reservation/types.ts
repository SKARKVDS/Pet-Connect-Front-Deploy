export type ReservationDashboard = {
  id: number,
  typeName: string,
  startTime: number,
  endTime: number,
};

export type ReservationRequest = {
  id: number,
  typeName: string,
  startTime: number,
  endTime: number,
  userName: string,
  phoneNumber: string,
  email: string,
  address: string,
  pets: string[],
  isFinish: boolean,
  canTouch: boolean,
};


export type ReservationProposal = {
  id: number,
  typeName: string,
  startTime: number,
  endTime: number,
  userName: string,
  phoneNumber: string,
  email: string,
  address: string,
  pets: string[],
};


