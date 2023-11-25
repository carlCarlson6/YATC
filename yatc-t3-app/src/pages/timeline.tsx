import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/timeline-controls";
import { TimelineDisplay } from "../ui/timeline/timeline-display";
import { Timeline, buildTimeline } from "yact/server/timeline/build-timeline";
import { TimelineProvider } from "yact/ui/timeline/store";

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
  const session = await getSession(context)
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

  return { props: {
    serverTimeline: await buildTimeline(),
  }}
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;