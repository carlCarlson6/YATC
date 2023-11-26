import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/controls/TimelineControls";
import { TimelineDisplay } from "../ui/timeline/TimelineDisplay";
import { Timeline, buildTimeline } from "yact/server/timeline/build-timeline";
import { TimelineProvider } from "yact/ui/timeline/store";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import type { User } from "yact/server/user/user";

const Timeline = ({serverTimeline, user}: TimelineProps) => (
  <TimelineProvider timeline={serverTimeline}>
    <Box>
      <TimeLineControls user={user}/>
      <TimelineDisplay />
    </Box>
  </TimelineProvider>
);

export default Timeline;

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
      serverTimeline: await buildTimeline(),
    }
  }
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;