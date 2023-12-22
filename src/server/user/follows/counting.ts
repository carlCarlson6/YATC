import { eq } from "drizzle-orm";
import { type DrizzleDb } from "src/server/infrastructure/drizzle"
import { followsTable } from "./follows.drizzle.schema";

export const countFollowersOnDrizzle = (db: DrizzleDb) => async (userId: string) => (await db
    .select()
    .from(followsTable)
    .where(eq(followsTable.isFollowingUserId, userId))
    .execute()
  ).length;

export const countFollowingOnDrizzle = (db: DrizzleDb) => async (userId: string) => (await db
    .select()
    .from(followsTable)
    .where(eq(followsTable.userId, userId))
    .execute()
  ).length;