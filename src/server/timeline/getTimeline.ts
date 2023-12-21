import { type TweetEntity } from "../publish-tweet/tweet.drizzle.schema";
import type { EmojiTweet } from "../core/EmojiTweet";

export const getTimeline = ({ buildTimeline, addUserData }: {
  buildTimeline: (userId: string) => Promise<TweetEntity[]>;
  addUserData: (tweets: TweetEntity[]) => Promise<EmojiTweet[]>;
}) => async (userId: string) => {
  const builtTimeline = await buildTimeline(userId);
  return await addUserData(builtTimeline);
};
