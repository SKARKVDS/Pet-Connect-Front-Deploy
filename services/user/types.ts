export type User = {
  id: number,
  email: string
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  countService: number,
  url: string,
  countPet: number,
  countProposal: number,
};

export type Account = {
  email: string
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  url: string,
  badgeUrl: string,
  isAdmin: boolean,
};


export type InputUserAdd = {
  email: string
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  avatar: any
};

export type InputUserUpdate = {
  token: string,
  email: string
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
};

export type InputUserUpdateAdmin = {
  id: number,
  email: string
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  countService: number,
};


export type UserToken = {
  token :string,
  email: string
  userName: string,
};