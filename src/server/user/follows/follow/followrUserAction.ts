"use server"

import { checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { followUser, storeFollowerOnDrizzle } from "./followUser";
import type { DrizzleDb } from "src/server/infrastructure/drizzle";
import type { AuthValidator } from "src/server/auth/AuthValidator";

export const followrUserAction = (db: DrizzleDb, auth: AuthValidator) => followUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(db),
  storeFollower: storeFollowerOnDrizzle(db),
  auth
});