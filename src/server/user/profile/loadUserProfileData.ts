import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { countFollowersOnDrizzle, countFollowingOnDrizzle } from "../follows/counting";
import { type DrizzleDb } from "../../infrastructure/drizzle";
import { checkIfFollowingWithDrizzle } from "../follows/checkIfFollowing";
import { getUserProfileWithDrizzle } from "./getUserProfileWithDrizzle";
import { getUserEmojeetsWithDrizzle } from "./getUserEmojeetsWithDrizzle";

export const loadUserProfileData = (db: DrizzleDb) => async (userWhoExecutesRequest: User, userNameOfProfileToLoad: string) => {
  const maybeUser = await getUserProfileWithDrizzle(db)(userNameOfProfileToLoad);
  if (!maybeUser) return null;
  const isOwnProfile = maybeUser.id === userWhoExecutesRequest.id;
  return {
    user: {
      ...maybeUser,
      isOwnProfile,
      followed: isOwnProfile ? true : await checkIfFollowingWithDrizzle(db)(userWhoExecutesRequest.id, maybeUser.id),
      followersCount: await countFollowersOnDrizzle(db)(maybeUser.id),
      followingCount: await countFollowingOnDrizzle(db)(maybeUser.id),
    },
    emojeets: await getUserEmojeetsWithDrizzle(db)(maybeUser.id),
  };
};