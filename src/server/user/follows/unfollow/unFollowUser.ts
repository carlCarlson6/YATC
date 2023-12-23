"use server"

import z from "zod";
import { type CheckIfFollowing } from "../checkIfFollowing";
import { type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "../follows.drizzle.schema";
import { eq } from "drizzle-orm";
import type { AuthValidator } from "src/server/auth/AuthValidator";

const unFollowUserInputSchema = z.object({
  userToUnfollow: z.string().min(1),
});

export const unFollowUser = ({ checkIfFollowing, removeFollower, auth }: {
  checkIfFollowing: CheckIfFollowing,
  removeFollower: (userWhoFollos: string, userToUnfollow: string) => Promise<void>,
  auth: AuthValidator,
}) => async (input: {
  userToUnfollow: string,
}) => {
  const user = await auth();
  const {userToUnfollow} = await unFollowUserInputSchema.parseAsync(input);

  const isAlreadyFollowing = await checkIfFollowing(user.id, userToUnfollow);
  if (!isAlreadyFollowing) {
    console.info("not following - aborting operation");
    return;
  }
  await removeFollower(user.id, userToUnfollow);
}

export const removeFollowerOnDrizzle = (db: DrizzleDb) => async (
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
