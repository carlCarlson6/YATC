import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/controls/TimelineControls";
import { TimelineDisplay } from "../ui/timeline/TimelineDisplay";
import { TimelineProvider } from "src/ui/timeline/store";
import { authPageGuard } from "src/server/infrastructure/nextauth/page-auth-guard";
import type { User } from "src/server/user/user";
import Head from "next/head";
import type { Timeline } from "src/server/timeline/EmojiTweet";
import getTimeline from "src/server/timeline/getTimeline";

export default function Timeline({timeline, user}: TimelineProps) {
  return (<>
    <Head>
      <title>YATC | TIMELINE</title>
    </Head>
    <TimelineProvider timeline={timeline}>
      <Box>
        <TimeLineControls user={user}/>
        <TimelineDisplay />
      </Box>
    </TimelineProvider>
  </>);
}

export const getServerSideProps: GetServerSideProps<{
  timeline: Timeline,
  user: User
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated") {
    return authResult.redirectReturn;
  }
  
  const timeline = await getTimeline(authResult.user.id);
  return {
    props: {
      user: authResult.user,
      timeline,
    }
  }
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;