import { eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "yact/server/infrastructure/drizzle";
import { followsTable } from "./follow.drizzle.schema";
import { tweetsTable } from "yact/server/send-tweet/tweet.drizzle.schema";

export const checkIfFollowingWithDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userIsFollowingId: string
) => {
  const results = await db
    .select({})
    .from(tweetsTable)
    .where(eq(followsTable.id, userId) && eq(followsTable.isFollowingUserId, userIsFollowingId))
    .execute();
  const result = results.at(0);
  return !result ? false : true;
};

export const checkIfFollowing = checkIfFollowingWithDrizzle(drizzleDb);

export type CheckIfFollowing = typeof checkIfFollowing;