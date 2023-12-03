import { eq } from "drizzle-orm";
import { type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "./follow.drizzle.schema";
import { tweetsTable } from "src/server/publish-tweet/tweet.drizzle.schema";

export const checkIfFollowingWithDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userIsFollowingId: string
) => {
  const results = await db
    .select({})
    .from(followsTable)
    .where(eq(followsTable.userId, userId) && eq(followsTable.isFollowingUserId, userIsFollowingId))
    .execute();
  const result = results.at(0);
  return !result ? false : true;
};

export type CheckIfFollowing = ReturnType<typeof checkIfFollowingWithDrizzle>;