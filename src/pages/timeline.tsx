import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/controls/TimelineControls";
import { TimelineDisplay } from "../ui/timeline/TimelineDisplay";
import { buildTimelineFromDb, addUserData } from "src/server/timeline/buildTimeline";
import { TimelineProvider } from "src/ui/timeline/store";
import { authPageGuard } from "src/server/infrastructure/nextauth/page-auth-guard";
import type { User } from "src/server/user/user";
import Head from "next/head";
import { getTimeline } from "src/server/timeline/getTimeline";
import { vercelKvCache } from "src/server/infrastructure/vercelKv";
import { drizzleDb } from "src/server/infrastructure/drizzle";
import type { Timeline } from "src/server/core/Tweet";

export default function Timeline({serverTimeline, user}: TimelineProps) {
  return (<>
    <Head>
      <title>YATC | TIMELINE</title>
    </Head>
    <TimelineProvider timeline={serverTimeline}>
      <Box>
        <TimeLineControls user={user}/>
        <TimelineDisplay />
      </Box>
    </TimelineProvider>
  </>);
}

export const getServerSideProps: GetServerSideProps<{
  serverTimeline: Timeline,
  user: User
}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated")
    return authResult.redirectReturn;

  return {
    props: {
      user: authResult.user,
      serverTimeline: await getTimeline({
        cache: vercelKvCache,
        buildTimeline: buildTimelineFromDb(drizzleDb),
        addUserData: addUserData(drizzleDb),
      })(authResult.user.id),
    }
  }
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;