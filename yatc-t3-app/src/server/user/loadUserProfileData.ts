import { getUserTweets } from "src/server/user/get-user-tweets";
import type { User } from "src/server/user/user";
import { countFollowersOnDrizzle, countFollowingOnDrizzle } from "./follows/counting";
import type { DrizzleDb } from "../infrastructure/drizzle";
import { checkIfFollowingWithDrizzle } from "./follows/checkIfFollowing";
import { getUserProfileWithDrizzle } from "./getUserProfile";

export const loadUserProfileData = (db: DrizzleDb) => async (userWhoExecutesRequest: User, userNameOfProfileToLoad: string) => {
  const maybeUser = await getUserProfileWithDrizzle(db)(userNameOfProfileToLoad);
  if (!maybeUser) return null;
  return {
    user: {
      ...maybeUser,
      isOwnProfile: maybeUser.id === userWhoExecutesRequest.id,
      followed: await checkIfFollowingWithDrizzle(db)(userWhoExecutesRequest.id, maybeUser.id),
      followersCount: await countFollowersOnDrizzle(db)(maybeUser.id),
      followingCount: await countFollowingOnDrizzle(db)(maybeUser.id),
    },
    tweets: await getUserTweets(maybeUser.id),
  };
};
