"use server"

import { type DrizzleDb } from "src/server/infrastructure/drizzle";
import { followsTable } from "../follows.drizzle.schema";
import { type CheckIfFollowing } from "../checkIfFollowing";
import { randomUUID } from "crypto";
import type { AuthValidator } from "src/server/auth/AuthValidator";
import { z } from "zod";

const followUserInputSchema = z.object({
  userToFollow: z.string().min(1),
});

export const followUser = ({ checkIfFollowing, storeFollower, auth }: {
  checkIfFollowing: CheckIfFollowing,
  storeFollower: (userWhoFollos: string, userToFollow: string) => Promise<void>,
  auth: AuthValidator,
}) => async (input: {
  userToFollow: string,
}) => {
  const user = await auth();
  const {userToFollow} = await followUserInputSchema.parseAsync(input);

  const isAlreadyFollowing = await checkIfFollowing(user.id, userToFollow);
  if (isAlreadyFollowing) {
    console.info("already followed - aborting operation");
    return;
  }
  
  await storeFollower(user.id, userToFollow);
};

export const storeFollowerOnDrizzle = (db: DrizzleDb) => async (
  userId: string, 
  userToFollowId: string
) => {
  await db.insert(followsTable).values({
    id: randomUUID(),
    userId: userId,
    isFollowingUserId: userToFollowId,
  }).execute();
}
