import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import type { Timeline } from "yact/server/timeline/build-timeline";
import type { User } from "yact/server/user/user";
import { sanitizeQueryParams } from "../../server/infrastructure/sanitize-query-params";
import { Box } from "@radix-ui/themes";
import { UserProfileDisplay } from "../../ui/user-profile/UserProfileDisplay";
import { UserProfileControls } from "../../ui/user-profile/controls/UserProfileControls";
import { loadUserProfileData } from "../../server/user/loadUserProfileData";

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
  user: User & { 
    isOwnProfile: boolean, 
    followed: boolean, 
    followersCount: number, 
    followingCount: number 
  },
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated") return authResult.redirectReturn;
  const data = await loadUserProfileData(authResult.user, sanitizeQueryParams(context.query.userName));
  return !data ? { notFound: true } : { props: { ...data } }
}