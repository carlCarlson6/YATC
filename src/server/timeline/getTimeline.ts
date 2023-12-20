import { type TweetEntity } from "../publish-tweet/tweet.drizzle.schema";
import type { AppCache } from "../core/AppCache";
import { timelineId } from "./timelineId";
import type { Tweet } from "../core/Tweet";

export const getTimeline = ({ cache, buildTimeline, addUserData }: {
  cache: AppCache;
  buildTimeline: (userId: string) => Promise<TweetEntity[]>;
  addUserData: (tweets: TweetEntity[]) => Promise<Tweet[]>;
}) => async (userId: string) => {
  const timeline = await cache.read<TweetEntity[]>(timelineId(userId));
  if (!timeline || timeline.length === 0) {
    const builtTimeline = await buildTimeline(userId);
    await cache.upsert(timelineId(userId), builtTimeline);
    return await addUserData(builtTimeline);
  }
  return await addUserData(timeline);
};
