import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { mockTimeLine } from "../mock-timeline";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "./timeline-controls";
import { TimelineDisplay } from "./timeline-display";

export default ({timeline}: TimelineProps) => (
  <Box >
      <TimeLineControls />
      <TimelineDisplay timeline={timeline} />
  </Box>
);

export const getServerSideProps: GetServerSideProps<{timeline: Tweet[]}> =async (context) => {
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
    timeline: mockTimeLine
  }}
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export type Tweet = {
  text: string,
  user: {
    name: string,
    avatar: string,
  } 
}