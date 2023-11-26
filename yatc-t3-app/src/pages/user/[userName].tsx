import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import type { Timeline } from "yact/server/timeline/build-timeline";
import { getUserTweets } from "yact/server/timeline/get-user-tweets";
import type { User } from "yact/server/user/user";
import { sanitizeQueryParams } from "../../server/infrastructure/sanitize-query-params";
import { findUserProfile } from "yact/server/user/get-user-profile";
import { Box } from "@radix-ui/themes";
import { UserProfileDisplay } from "../../ui/user-profile/UserProfileDisplay";
import { UserProfileControls } from "../../ui/user-profile/controls/UserProfileControls";
import { checkIfFollowing } from "yact/server/user/follow/checkIfFollowing";

const UserProfile = ({user, tweets}: UserProfileProps) => (
  <Box>
    <UserProfileControls 
      isOwnProfile={user.isOwnProfile} 
      followed={user.followed}
      userId={user.id}
    />
    <UserProfileDisplay 
      user={user} 
      tweets={tweets} 
    />
  </Box>
);

export default UserProfile;

export type UserProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps<{
  tweets: Timeline,
  user: User & { isOwnProfile: boolean, followed: boolean } ,
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated")
    return authResult.redirectReturn;
    
  const sanitizedUserName = sanitizeQueryParams(context.query.userName);
  const maybeUser = await findUserProfile(sanitizedUserName);
  return !maybeUser
    ? { notFound: true }
    : { props: { 
      user: { 
        ...maybeUser, 
        isOwnProfile: maybeUser.id === authResult.user.id, 
        followed: await checkIfFollowing(authResult.user.id, maybeUser.id), 
      },
      tweets: await getUserTweets(maybeUser.id),
    }};
}

