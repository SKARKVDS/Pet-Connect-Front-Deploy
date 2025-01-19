export type Topic = {
  id: number,
  name: string,
  creationTime: number,
  updateTime: number,
  creatorName: string,
  countPosts: number
};

export type InputTopicAdd = {
  name: string,
  forumId: number,
};

export type InputTopicUpdate = {
  id: number,
  name: string
};