import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/timeline-controls";
import { TimelineDisplay } from "../ui/timeline/timeline-display";
import { Timeline, buildTimeline } from "yact/server/timeline/build-timeline";
import { TimelineProvider } from "yact/ui/timeline/store";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";

const Timeline = ({serverTimeline}: TimelineProps) => (
  <TimelineProvider timeline={serverTimeline}>
    <Box>
      <TimeLineControls />
      <TimelineDisplay />
    </Box>
  </TimelineProvider>
  
);

export default Timeline;

export const getServerSideProps: GetServerSideProps<{serverTimeline: Timeline}> = async (context) => {
  const authResult = await authPageGuard(context);
  if (authResult.result == "unauthenticated")
    return authResult.redirectReturn;

  return {
    props: {
      serverTimeline: await buildTimeline(),
    }
  }
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;