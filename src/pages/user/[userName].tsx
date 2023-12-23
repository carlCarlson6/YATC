import { Box } from "@radix-ui/themes";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import type { Timeline } from "src/server/timeline/EmojiTweet";
import { authPageGuard } from "src/server/infrastructure/nextauth/page-auth-guard";
import { sanitizeQueryParams } from "src/server/infrastructure/sanitize-query-params";
import loadUserProfileData from "src/server/user/loadUserProfileData";
import type { User } from "src/server/user/userProfile.drizzle.schema";
import { UserProfileDisplay } from "src/ui/user-profile/UserProfileDisplay";
import { UserProfileControls } from "src/ui/user-profile/controls/UserProfileControls";

export default function UserProfile({user, emojeets}: UserProfileProps) {
  return(<>
    <Head><title>YATC | {user.name}</title></Head>
    <Box>
      <UserProfileControls 
        isOwnProfile={user.isOwnProfile} 
        followed={user.followed}
        userId={user.id}
      />
      <UserProfileDisplay 
        user={user} 
        emojeets={emojeets} 
      />
    </Box>
  </>);
}

export type UserProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps<{
  emojeets: Timeline,
  user: User & { 
    isOwnProfile: boolean, 
    followed: boolean, 
    followersCount: number, 
    followingCount: number 
  },
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated") {
    return authResult.redirectReturn;
  }

  const data = await loadUserProfileData(authResult.user, sanitizeQueryParams(context.query.userName));
  return !data ? { notFound: true } : { props: { ...data } }
}