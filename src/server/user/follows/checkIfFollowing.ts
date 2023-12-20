import { eq } from "drizzle-orm";
import { type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "./follow.drizzle.schema";

export const checkIfFollowingWithDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userIsFollowingId: string
) => {
  const results = await db
    .select({})
    .from(followsTable)
    .where(eq(followsTable.userId, userId) && eq(followsTable.isFollowingUserId, userIsFollowingId))
    .execute();
  return results.length > 0;
};

export type CheckIfFollowing = ReturnType<typeof checkIfFollowingWithDrizzle>;