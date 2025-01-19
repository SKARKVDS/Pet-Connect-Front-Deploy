export type Badge = {
  id: number,
  name: string,
  numberServices: number,
  url: string
};

export type InputBadgeAdd = {
  name: string,
  numberServices: number,
  avatar: any
};

export type InputBadgeUpdateAttributs = {
  id: number,
  name: string,
  numberServices: number,
};

export type InputBadgeUpdateImage = {
  id: number,
  url: string,
  avatar: any
};