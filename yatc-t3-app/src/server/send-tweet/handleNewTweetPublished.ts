import { eq } from "drizzle-orm";
import type { DrizzleDb } from "../infrastructure/drizzle";
import { users } from "../infrastructure/drizzle/base.drizzle.schema";
import { follows } from "../user/follow/follow.drizzle.schema";
import type { SendUpdateUserTimeline } from "../timeline/sendUpdateUserTimeline";

export const handleNewTweetPublished = ({loadFollower, publish}: {
  loadFollower: (userId: string) => Promise<string[]>, 
  publish: SendUpdateUserTimeline
}) => async (event: {
  tweetId: string, 
  publishedBy: string
}) => {
  const followers = await loadFollower(event.publishedBy);
  const publishAction = followers.map(follower => publish({tweetId: event.tweetId, userId: follower}));
  await Promise.all(publishAction);
}

export const fetchFollorers = (db: DrizzleDb) => async (userId: string) => {
  const result = await db
    .select({
      follower: users.id
    })
    .from(follows)
    .where(eq(follows.userWhoIsFollowed, userId))
    .rightJoin(users, eq(follows.userWhoIsFollowing, users.id))
    .execute();
  return result.map(({follower}) => follower);
}