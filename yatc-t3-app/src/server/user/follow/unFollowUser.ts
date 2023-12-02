import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { type CheckIfFollowing, checkIfFollowingWithDrizzle } from "./checkIfFollowing";
import type { DrizzleDb } from "yact/server/infrastructure/drizzle";
import { followsTable } from "./follow.drizzle.schema";
import { eq } from "drizzle-orm";

export const unFollowUserProcedure = protectedProcedure
  .input(z.object({
    userToUnfollow: z.string().min(1),
  }))
  .mutation(({ctx: {db, session: {user}}, input}) => unFollowUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    removeFollower: removeFollowerOnDrizzle(db),
  })(user.id, input.userToUnfollow));

const unFollowUser = ({ checkIfFollowing, removeFollower }: {
  checkIfFollowing: CheckIfFollowing,
  removeFollower: (userWhoFollos: string, userToUnfollow: string) => Promise<void>,
}) => async (
  userWhoFollows: string,
  userToUnfollow: string,
) => {
  const isAlreadyFollowing = await checkIfFollowing(userWhoFollows, userToUnfollow);
  if (!isAlreadyFollowing) {
    console.info("not following - aborting operation");
    return;
  }
  await removeFollower(userWhoFollows, userToUnfollow);
}

const removeFollowerOnDrizzle = (db: DrizzleDb) => async (userId: string, userToUnfollowId: string) => {
  await db
    .delete(followsTable)
    .where(
      eq(followsTable.userId, userId) && 
      eq(followsTable.isFollowingUserId, userToUnfollowId))
    .execute();
}