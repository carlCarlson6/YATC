import type { Emojeet } from "./EmojiTweet";
import type { EmojiEntity } from "../emojeets/publish/emojis.drizzle.schema";

export const getTimeline = ({ fetchEmojeets, addUserData }: {
  fetchEmojeets: (userId: string) => Promise<EmojiEntity[]>;
  addUserData: (tweets: EmojiEntity[]) => Promise<Emojeet[]>;
}) => async (userId: string) => {
  const builtTimeline = await fetchEmojeets(userId);
  return await addUserData(builtTimeline);
};
