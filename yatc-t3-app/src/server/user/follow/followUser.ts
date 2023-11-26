import { eq } from "drizzle-orm";
import { type DrizzleDb, drizzleDb } from "yact/server/infrastructure/drizzle";
import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { follows } from "./follow.drizzle.schema";

export const followUserProcedure = protectedProcedure
  .input(z.object({
    userToFollow: z.string().min(1)
  }))
  .mutation(({ctx: {db, session: {user}}, input}) => followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db),
  })(user.id, input.userToFollow));

const followUser = ({ checkIfFollowing, storeFollower }: {
  checkIfFollowing: (userWhoFollos: string, userToFollow: string) => Promise<boolean>;
  storeFollower: (userWhoFollos: string, userToFollow: string) => Promise<void>;
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

const checkIfFollowingWithDrizzle = (db: DrizzleDb) => async (userWhoFollos: string, userToFollow: string) => {
  const result = await db.query.follows.findFirst({
    where: eq(follows.userWhoIsFollowed, userToFollow) && eq(follows.userWhoIsFollowing, userWhoFollos)
  }).execute();
  return !result ? false : true;
};

export const checkIfFollowing = checkIfFollowingWithDrizzle(drizzleDb);

const storeFollowerOnDrizzle = (db: DrizzleDb) => async (userWhoFollos: string, userToFollow: string) => {
  await db.insert(follows).values({
    userWhoIsFollowed: userToFollow,
    userWhoIsFollowing: userWhoFollos,
  }).execute();
}