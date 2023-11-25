import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import { Timeline } from "yact/server/timeline/build-timeline";
import { getUserTweets } from "yact/server/timeline/get-user-tweets";
import { User } from "yact/server/user/user";
import { sanitizeQueryParams } from "../../server/infrastructure/sanitize-query-params";
import { findUserProfile } from "yact/server/user/get-user-profile";
import { Avatar, Box, Flex, Text, Separator, Container } from "@radix-ui/themes";
import { TweetsDisplay } from "yact/ui/TweetsDisplay";

const UserProfile = ({user, tweets}: UserProfileProps) => {
  return (<>
    <Flex align={'center'} justify={'center'} direction={'column'} gap={'5'}>
      <Box pb={'2'} grow={'1'}>
        <Flex align={'center'} justify={'center'} direction={'column'} gap={'2'}>
          <Avatar
            size={'7'}
            src={user.avatar}
            fallback={user.name}
          />
          <Text>{user.name}</Text>
        </Flex>
      </Box>
      <Separator size={'3'} />
      <TweetsDisplay tweets={tweets}/>
    </Flex>
  </>);
}

export default UserProfile;

type UserProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps<{
  tweets: Timeline,
  user: User,
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated")
    return authResult.redirectReturn;
    
  const sanitizedUserName = sanitizeQueryParams(context.query["userName"]);
  const maybeUser = await findUserProfile(sanitizedUserName);
  return !maybeUser
    ? { notFound: true }
    : { props: { 
      user: maybeUser,
      tweets: await getUserTweets(maybeUser.id),
    }};
}

