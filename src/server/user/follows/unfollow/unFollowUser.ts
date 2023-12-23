"use server"

import z from "zod";
import { type CheckIfFollowing, checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { drizzleDb, type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "../follows.drizzle.schema";
import { eq } from "drizzle-orm";
import { validateAuth } from "src/server/validateAuth";

const unFollowUserInputSchema = z.object({
  userToUnfollow: z.string().min(1),
});

const unFollowUser = ({ checkIfFollowing, removeFollower }: {
  checkIfFollowing: CheckIfFollowing,
  removeFollower: (userWhoFollos: string, userToUnfollow: string) => Promise<void>,
}) => async (input: {
  userToUnfollow: string,
}) => {
  const user = await validateAuth();
  const {userToUnfollow} = await unFollowUserInputSchema.parseAsync(input);

  const isAlreadyFollowing = await checkIfFollowing(user.id, userToUnfollow);
  if (!isAlreadyFollowing) {
    console.info("not following - aborting operation");
    return;
  }
  await removeFollower(user.id, userToUnfollow);
}

const removeFollowerOnDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userToUnfollowId: string
) => {
  await db
    .delete(followsTable)
    .where(
      eq(followsTable.userId, userId) && 
      eq(followsTable.isFollowingUserId, userToUnfollowId))
    .execute();
}

export default unFollowUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(drizzleDb),
  removeFollower: removeFollowerOnDrizzle(drizzleDb),
});
