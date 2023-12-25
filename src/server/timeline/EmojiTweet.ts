import { EmojiEntity } from "../emojeets/publish/emojis.drizzle.schema";
import type { User } from "../user/profile/userProfile.drizzle.schema";

export type Emojeet = {
  id: string;
  emoji: string;
  publishedAt: string;
  user: User;
  reactions: {
    emoji: string,
  }[];
};

export type EmojiEntityWithReactions = EmojiEntity & {reactions: {emoji: string}[]};

export type Timeline = Emojeet[];
