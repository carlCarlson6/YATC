import { eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "yact/server/infrastructure/drizzle"
import { followsTable } from "./follow.drizzle.schema";

const countFollowersOnDrizzle = (db: DrizzleDb) => async (userId: string) => (await db
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