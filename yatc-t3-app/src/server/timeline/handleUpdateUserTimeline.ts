import { type TweetEntity, tweetsTable } from "../publish-tweet/tweet.drizzle.schema";
import z from 'zod';
import type { AppCache } from "src/server/core/AppCache";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { eq } from "drizzle-orm";
import { timelineId } from "./timelineId";

export const updateUserTimelineCommanSchema = z.object({
  userId:   z.string().min(1),
  tweetId:  z.string().min(1),
});

export type UpdateUserTimelineCommand = z.infer<typeof updateUserTimelineCommanSchema>;

export const updateUserTimeline = ({cache, findTweet, buildTimeline}: {
  cache: AppCache,
  findTweet: (tweetId: string) => Promise<TweetEntity|undefined>,
  buildTimeline: (userId: string) => Promise<TweetEntity[]>,
}) => async ({
  userId, 
  tweetId
}: UpdateUserTimelineCommand) => {
  const tweet = await findTweet(tweetId);
  if (!tweet) return;

  const timeline = await cache.read<TweetEntity[]>(timelineId(userId));
  console.log("here1");
  if (!timeline || timeline.length === 0) {
    console.log("here2");
    const builtTimeline = await buildTimeline(userId);
    await cache.upsert(timelineId(userId), builtTimeline);
    return;
  }
  console.log("here3");
  const updatedTimeline = [tweet, ...timeline];
  await cache.upsert(timelineId(userId), updatedTimeline);
}

export const findTweetOnDrizzleDb = (db: DrizzleDb) => async (tweetId: string) => {
  const result = await db.select().from(tweetsTable).where(eq(tweetsTable.id, tweetId));
  return result.at(0);
}