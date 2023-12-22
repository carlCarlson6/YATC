import { type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "../follows.drizzle.schema";
import { type CheckIfFollowing } from "../checkIfFollowing";
import { randomUUID } from "crypto";

export const followUser = ({ checkIfFollowing, storeFollower }: {
  checkIfFollowing: CheckIfFollowing,
  storeFollower: (userWhoFollos: string, userToFollow: string) => Promise<void>,
}) => async (
  userWhoFollos: string,
  userToFollow: string
) => {
  const isAlreadyFollowing = await checkIfFollowing(userWhoFollos, userToFollow);
  if (isAlreadyFollowing) {
    console.info("already followed - aborting operation");
    return;
  }
  
  await storeFollower(userWhoFollos, userToFollow);
};

export const storeFollowerOnDrizzle = (db: DrizzleDb) => async (userId: string, userToFollowId: string) => {
  await db.insert(followsTable).values({
    id: randomUUID(),
    userId: userId,
    isFollowingUserId: userToFollowId,
  }).execute();
}