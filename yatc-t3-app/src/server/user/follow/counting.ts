import { eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "src/server/infrastructure/drizzle"
import { followsTable } from "./follow.drizzle.schema";

export const countFollowersOnDrizzle = (db: DrizzleDb) => async (userId: string) => (await db
    .select()
    .from(followsTable)
    .where(eq(followsTable.isFollowingUserId, userId))
    .execute()
  ).length

const countFollowingOnDrizzle = (db: DrizzleDb) => async (userId: string) => (await db
    .select()
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .execute()
  ).length

export const countFollowers = countFollowersOnDrizzle(drizzleDb);
export const countFollowing = countFollowingOnDrizzle(drizzleDb);