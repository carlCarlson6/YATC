"use server"

import { checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { removeFollowerOnDrizzle, unFollowUser } from "./unFollowUser";
import type { DrizzleDb } from "src/server/infrastructure/drizzle";
import type { AuthValidator } from "src/server/auth/AuthValidator";

export const unFollowUserAction = (db: DrizzleDb, auth: AuthValidator) => unFollowUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(db),
  removeFollower: removeFollowerOnDrizzle(db),
  auth
});
