import { Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { redirect } from "next/navigation";

import { authOptions } from "src/server/infrastructure/nextauth";
import getTimeline from "src/server/timeline/getTimeline";
import { TimelineDisplay } from "src/ui/timeline/TimelineDisplay";
import { TimeLineControls } from "src/ui/timeline/controls/TimelineControls";
import { TimelineProvider } from "src/ui/timeline/store";

export default async function TimelinePage() {
  const session = await getServerSession(authOptions);
  if (!session){
    redirect('/');
  }

  const user = {...session.user, avatar: session.user.image};
  const timeline = await getTimeline(user.id);

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