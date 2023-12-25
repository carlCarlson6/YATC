"use client"

import { Box } from "@radix-ui/themes";
import { useTimeline } from "./store";
import { EmojeetsDisplay } from "../EmojeetsDisplay";

export const TimelineDisplay: React.FC = () => {
  const timeline = useTimeline(x => x.timeline);
  return (
    <Box style={{ width: '85%', float: 'right' }}>
      <EmojeetsDisplay emojeets={timeline}/>
    </Box>
  );
};