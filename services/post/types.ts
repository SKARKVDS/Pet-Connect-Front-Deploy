export type Post = {
  id: number,
  body: string,
  creationTime: string,
  creatorName: string,
  creatorUrl: string,
};

export type InputPostAdd = {
  body: string,
  topicId: number,
};

export type InputPostUpdate = {
  id: number,
  body: string,
};