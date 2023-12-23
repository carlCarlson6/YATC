"use server"

import { drizzleDb, type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "../follows.drizzle.schema";
import { checkIfFollowingWithDrizzle, type CheckIfFollowing } from "../checkIfFollowing";
import { randomUUID } from "crypto";
import { validateAuth } from "src/server/validateAuth";
import { z } from "zod";

const followUserInputSchema = z.object({
  userToFollow: z.string().min(1),
});

const followUser = ({ checkIfFollowing, storeFollower }: {
  checkIfFollowing: CheckIfFollowing,
  storeFollower: (userWhoFollos: string, userToFollow: string) => Promise<void>,
}) => async (input: {
  userToFollow: string,
}) => {
  const user = await validateAuth();
  const {userToFollow} = await followUserInputSchema.parseAsync(input);

  const isAlreadyFollowing = await checkIfFollowing(user.id, userToFollow);
  if (isAlreadyFollowing) {
    console.info("already followed - aborting operation");
    return;
  }
  
  await storeFollower(user.id, userToFollow);
};

const storeFollowerOnDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userToFollowId: string
) => {
  await db.insert(followsTable).values({
    id: randomUUID(),
    userId: userId,
    isFollowingUserId: userToFollowId,
  }).execute();
}

export default followUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(drizzleDb),
  storeFollower: storeFollowerOnDrizzle(drizzleDb),
});