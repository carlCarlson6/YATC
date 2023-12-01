import { type TweetEntity, tweets } from "../send-tweet/tweet.drizzle.schema";
import z from 'zod';
import type { AppCache } from "yact/server/core/AppCache";
import { type DrizzleDb, drizzleDb } from "../infrastructure/drizzle";
import { eq } from "drizzle-orm";
import type { NextApiRequest } from "next";
import { vercelKvCache } from "../infrastructure/vercelKv";
import { buildTimelineFromDb } from "./build-timeline";
import { timelineId } from "./timelineId";

export const updateUserTimelineCommanSchema = z.object({
  userId:   z.string().min(1),
  tweetId:  z.string().min(1),
});

export type UpdateUserTimelineCommand = z.infer<typeof updateUserTimelineCommanSchema>;

const handleUpdateUserTimeline = ({cache, findTweet, buildTimeline}: {
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
  if (!timeline || timeline.length === 0) {
    const builtTimeline = await buildTimeline(userId);
    await cache.upsert(timelineId(userId), builtTimeline);
    return;
  }

  const updatedTimeline = [tweet, ...timeline];
  await cache.upsert(timelineId(userId), updatedTimeline);
}

const findTweetOnDrizzleDb = (db: DrizzleDb) => async (tweetId: string) => {
  const result = await db.select().from(tweets).where(eq(tweets.id, tweetId));
  return result.at(0);
}

export const executeHandler = (req: NextApiRequest) => () => handleUpdateUserTimeline({
  cache: vercelKvCache,
  findTweet: findTweetOnDrizzleDb(drizzleDb),
  buildTimeline: buildTimelineFromDb(drizzleDb),
})(updateUserTimelineCommanSchema.parse(JSON.parse(req.body as string)));