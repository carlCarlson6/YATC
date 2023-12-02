import { getUserTweets } from "src/server/user/get-user-tweets";
import type { User } from "src/server/user/user";
import { findUserProfile } from "src/server/user/get-user-profile";
import { checkIfFollowing } from "src/server/user/follow/checkIfFollowing";
import { countFollowers, countFollowing } from "src/server/user/follow/counting";

export const loadUserProfileData = async (userWhoExecutesRequest: User, userNameOfProfileToLoad: string) => {
  const maybeUser = await findUserProfile(userNameOfProfileToLoad);
  return !maybeUser
    ? null
    : {
      user: {
        ...maybeUser,
        isOwnProfile: maybeUser.id === userWhoExecutesRequest.id,
        followed: await checkIfFollowing(userWhoExecutesRequest.id, maybeUser.id),
        followersCount: await countFollowers(maybeUser.id),
        followingCount: await countFollowing(maybeUser.id),
      },
      tweets: await getUserTweets(maybeUser.id),
    };
};
