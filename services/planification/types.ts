export type Planification = {
  dateTime: number,
  requestCount: boolean,
};


export type InputPlanificationAdd = {
  dateTimes: Planification[],
  proposalId: number,
};