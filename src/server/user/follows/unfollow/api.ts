"use server"

import { nextAuthValidator } from "src/server/auth/nextAuthValidator";
import { checkIfFollowingWithDrizzle } from "../checkIfFollowing";
import { removeFollowerOnDrizzle, unFollowUser } from "./unFollowUser";
import { drizzleDb } from "src/server/infrastructure/drizzle";

export const unFollowUserAction = unFollowUser({
  checkIfFollowing: checkIfFollowingWithDrizzle(drizzleDb),
  removeFollower: removeFollowerOnDrizzle(drizzleDb),
  auth: nextAuthValidator
});
