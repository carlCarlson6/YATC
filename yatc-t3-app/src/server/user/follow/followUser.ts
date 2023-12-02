import { type DrizzleDb } from "yact/server/infrastructure/drizzle";
import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { followsTable } from "./follow.drizzle.schema";
import { type CheckIfFollowing, checkIfFollowingWithDrizzle } from "./checkIfFollowing";
import { randomUUID } from "crypto";

export const followUserProcedure = protectedProcedure
  .input(z.object({
    userToFollow: z.string().min(1)
  }))
  .mutation(({ctx: {db, session: {user}}, input}) => followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower:    storeFollowerOnDrizzle(db),
  })(user.id, input.userToFollow));

const followUser = ({ checkIfFollowing, storeFollower }: {
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

const storeFollowerOnDrizzle = (db: DrizzleDb) => async (userId: string, userToFollowId: string) => {
  await db.insert(followsTable).values({
    id: randomUUID(),
    userId: userId,
    isFollowingUserId: userToFollowId,
  }).execute();
}