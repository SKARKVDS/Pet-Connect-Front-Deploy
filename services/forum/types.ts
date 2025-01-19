export type Forum = {
  id: number,
  name: string,
  countTopics: number
};

export type InputForumAdd = {
  name: string
};

export type InputForumUpdate = {
  id: number,
  name: string
};