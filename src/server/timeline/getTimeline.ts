import { type TweetEntity } from "../publish-tweet/tweet.drizzle.schema";
import type { Tweet } from "../core/Tweet";

export const getTimeline = ({ buildTimeline, addUserData }: {
  buildTimeline: (userId: string) => Promise<TweetEntity[]>;
  addUserData: (tweets: TweetEntity[]) => Promise<Tweet[]>;
}) => async (userId: string) => {
  const builtTimeline = await buildTimeline(userId);
  return await addUserData(builtTimeline);
};
