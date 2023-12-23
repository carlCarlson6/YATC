"use server"

import { nextAuthValidator } from "src/server/auth/nextAuthValidator";
import { checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { followUser, storeFollowerOnDrizzle } from "./followUser";
import { drizzleDb } from "src/server/infrastructure/drizzle";

export const followrUserAction = followUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(drizzleDb),
  storeFollower: storeFollowerOnDrizzle(drizzleDb),
  auth: nextAuthValidator,
});