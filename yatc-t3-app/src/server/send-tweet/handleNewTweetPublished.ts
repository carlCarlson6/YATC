import { eq } from "drizzle-orm";
import { drizzleDb, type DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { followsTable } from "../user/follow/follow.drizzle.schema";
import { sendUpdateUserTimelineWithQStash, type SendUpdateUserTimeline } from "../timeline/sendUpdateUserTimeline";
import type { NextApiRequest } from "next";
import { newTweetPublishedSchema } from "../core/domain";
import { getServerUrl } from "../infrastructure/getServerUrl";
import { qStashPublisher } from "yact/server/infrastructure/qstash";
import { findTweetOnDrizzleDb, updateUserTimeline } from "../timeline/handleUpdateUserTimeline";
import { vercelKvCache } from "../infrastructure/vercelKv";
import { buildTimelineFromDb } from "../timeline/build-timeline";

const handleNewTweetPublished = ({loadFollower, publish, updateTimeline}: {
  loadFollower: (userId: string) => Promise<string[]>, 
  publish: SendUpdateUserTimeline,
  updateTimeline: ReturnType<typeof updateUserTimeline>
}) => async (event: {
  tweetId: string, 
  publishedBy: string
}) => {
  await updateTimeline({userId: event.publishedBy, tweetId: event.tweetId});
  const followers = await loadFollower(event.publishedBy);
  const publishAction = followers.map(follower => publish({tweetId: event.tweetId, userId: follower}));
  await Promise.all(publishAction);
}

const loadFollowersFromDrizzleDb = (db: DrizzleDb) => async (userId: string) => {
  const result = await db
    .select({
      follower: usersTable.id
    })
    .from(followsTable)
    .where(eq(followsTable.isFollowingUserId, userId))
    .rightJoin(usersTable, eq(followsTable.isFollowingUserId, usersTable.id))
    .execute();
  return result.map(({follower}) => follower);
}

export const executeHandler = (req: NextApiRequest) => () => handleNewTweetPublished({
  loadFollower: loadFollowersFromDrizzleDb(drizzleDb),
  publish: sendUpdateUserTimelineWithQStash(qStashPublisher, getServerUrl(req)),
  updateTimeline:  updateUserTimeline({
    cache: vercelKvCache,
    findTweet: findTweetOnDrizzleDb(drizzleDb),
    buildTimeline: buildTimelineFromDb(drizzleDb),
  })
})(newTweetPublishedSchema.parse(JSON.parse(req.body as string)));