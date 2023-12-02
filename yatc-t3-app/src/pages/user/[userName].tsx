import { Box } from "@radix-ui/themes";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import { sanitizeQueryParams } from "yact/server/infrastructure/sanitize-query-params";
import type { Timeline } from "yact/server/timeline/build-timeline";
import { loadUserProfileData } from "yact/server/user/loadUserProfileData";
import type { User } from "yact/server/user/user";
import { UserProfileDisplay } from "yact/ui/user-profile/UserProfileDisplay";
import { UserProfileControls } from "yact/ui/user-profile/controls/UserProfileControls";

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