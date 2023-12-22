import type { User } from "../user/user";

export type Emojeet = {
  id: string;
  emoji: string;
  publishedAt: string;
  user: User;
  reactions: {
    emoji: string,
    user: User,
  }[];
};

export type Timeline = Emojeet[];