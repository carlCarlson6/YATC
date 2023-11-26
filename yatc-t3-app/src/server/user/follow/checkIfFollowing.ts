import { eq } from "drizzle-orm";
import { DrizzleDb, drizzleDb } from "yact/server/infrastructure/drizzle";
import { follows } from "./follow.drizzle.schema";

export const checkIfFollowingWithDrizzle = (db: DrizzleDb) => async (
  userWhoIsFollowing: string, 
  userWhoIsFollowed: string
) => {
  const result = await db.query.follows.findFirst({
    where: eq(follows.userWhoIsFollowing, userWhoIsFollowing) && eq(follows.userWhoIsFollowed, userWhoIsFollowed)
  }).execute();
  return !result ? false : true;
};

export const checkIfFollowing = checkIfFollowingWithDrizzle(drizzleDb);

export type CheckIfFollowing = typeof checkIfFollowing;