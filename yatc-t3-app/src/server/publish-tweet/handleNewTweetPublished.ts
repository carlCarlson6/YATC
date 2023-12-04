import { eq } from "drizzle-orm";
import { type DrizzleDb } from "../infrastructure/drizzle";
import { usersTable } from "../infrastructure/drizzle/base.drizzle.schema";
import { followsTable } from "../user/follows/follow.drizzle.schema";
import { type SendUpdateUserTimeline } from "../timeline/sendUpdateUserTimeline";
import type { updateUserTimeline } from "../timeline/handleUpdateUserTimeline";

export const handleNewTweetPublished = ({loadFollower, publish, updateTimeline}: {
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

export const loadFollowersFromDrizzleDb = (db: DrizzleDb) => async (userId: string) => {
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

