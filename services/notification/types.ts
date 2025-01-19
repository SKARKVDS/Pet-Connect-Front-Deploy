export type Notification = {
  id: number,
  name: string,
  typeName: string,
  creatorName: string,
};

export type InputNotificationAdd = {
  name: string
  typeId: number,
};
