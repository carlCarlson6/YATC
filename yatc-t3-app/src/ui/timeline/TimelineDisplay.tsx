import { Box } from "@radix-ui/themes";
import { useTimeline } from "./store";
import { TweetsDisplay } from "../TweetsDisplay";

export const TimelineDisplay: React.FC = () => {
  const timeline = useTimeline(x => x.timeline);
  return (
    <Box style={{ width: '85%', float: 'right' }}>
      <TweetsDisplay tweets={timeline}/>
    </Box>
  );
};