import { eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "yact/server/infrastructure/drizzle"
import { follows } from "./follow.drizzle.schema";

const countFollowersOnDrizzle = (db: DrizzleDb) => async (userWhoIsFollowed: string) => {
  const result = await db.select().from(follows).where(eq(follows.userWhoIsFollowed, userWhoIsFollowed)).execute();
  return result.length;
}

const countFollowingOnDrizzle = (db: DrizzleDb) => async (userWhoIsFollowing: string) => {
  const result = await db.select().from(follows).where(eq(follows.userWhoIsFollowing, userWhoIsFollowing)).execute();
  return result.length;
}

export const countFollowers = countFollowersOnDrizzle(drizzleDb);
export const countFollowing = countFollowingOnDrizzle(drizzleDb);