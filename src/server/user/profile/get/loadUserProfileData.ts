"use server"

import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { countFollowersOnDrizzle, countFollowingOnDrizzle } from "../../follows/counting";
import { type DrizzleDb } from "../../../infrastructure/drizzle";
import { checkIfFollowingWithDrizzle } from "../../follows/checkIfFollowing";
import { getUserProfileWithDrizzle } from "./getUserProfileWithDrizzle";
import { loadUserEmojis } from "src/server/timeline/buildTimeline";
import { addUserData } from "src/server/timeline/addUserData";

export const loadUserProfileData = (db: DrizzleDb) => async (userWhoExecutesRequest: User, userNameOfProfileToLoad: string) => {
  const maybeUser = await getUserProfileWithDrizzle(db)(userNameOfProfileToLoad);
  if (!maybeUser) return null;
  const isOwnProfile = maybeUser.id === userWhoExecutesRequest.id;
  const emojis = await loadUserEmojis(db, maybeUser.id);
  const emojisWithUserData = await addUserData(db)(emojis);
  return {
    user: {
      ...maybeUser,
      isOwnProfile,
      followed: isOwnProfile ? true : await checkIfFollowingWithDrizzle(db)(userWhoExecutesRequest.id, maybeUser.id),
      followersCount: await countFollowersOnDrizzle(db)(maybeUser.id),
      followingCount: await countFollowingOnDrizzle(db)(maybeUser.id),
    },
    emojeets: emojisWithUserData,
  };
};