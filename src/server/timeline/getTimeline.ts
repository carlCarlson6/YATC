import type { Emojeet, EmojiEntityWithReactions } from "./EmojiTweet";

export const getTimeline = ({ 
  fetchEmojeets, addUserData 
}: {
  fetchEmojeets: (userId: string) => Promise<EmojiEntityWithReactions[]>;
  addUserData: (tweets: EmojiEntityWithReactions[]) => Promise<Emojeet[]>;
}) => async (userId: string) => {
  const builtTimeline = await fetchEmojeets(userId);
  return await addUserData(builtTimeline);
};
