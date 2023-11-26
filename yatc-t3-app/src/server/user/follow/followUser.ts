import { type DrizzleDb } from "yact/server/infrastructure/drizzle";
import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { follows } from "./follow.drizzle.schema";
import { CheckIfFollowing, checkIfFollowingWithDrizzle } from "./checkIfFollowing";

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

const storeFollowerOnDrizzle = (db: DrizzleDb) => async (userWhoFollos: string, userToFollow: string) => {
  await db.insert(follows).values({
    userWhoIsFollowed: userToFollow,
    userWhoIsFollowing: userWhoFollos,
  }).execute();
}