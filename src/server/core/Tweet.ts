export type Tweet = {
  id: string;
  text: string;
  publishedAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export type Timeline = Tweet[];