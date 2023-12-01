import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@radix-ui/themes";
import { TimeLineControls } from "../ui/timeline/controls/TimelineControls";
import { TimelineDisplay } from "../ui/timeline/TimelineDisplay";
import { type Timeline, executeGetTimeline } from "yact/server/timeline/build-timeline";
import { TimelineProvider } from "yact/ui/timeline/store";
import { authPageGuard } from "yact/server/infrastructure/nextauth/page-auth-guard";
import type { User } from "yact/server/user/user";

export default function Timeline({serverTimeline, user}: TimelineProps) {
  return (
    <TimelineProvider timeline={serverTimeline}>
      <Box>
        <TimeLineControls user={user}/>
        <TimelineDisplay />
      </Box>
    </TimelineProvider>
  );
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
      serverTimeline: await executeGetTimeline(authResult.user),
    }
  }
}

type TimelineProps = InferGetServerSidePropsType<typeof getServerSideProps>;