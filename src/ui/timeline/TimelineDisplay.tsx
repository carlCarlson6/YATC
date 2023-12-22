import { Box } from "@radix-ui/themes";
import { useTimeline } from "./store";
import EmojeetDisplay from "../EmojeetDisplay";

export const TimelineDisplay: React.FC = () => {
  const timeline = useTimeline(x => x.timeline);
  return (
    <Box style={{ width: '85%', float: 'right' }}>
      <EmojeetDisplay emojeets={timeline}/>
    </Box>
  );
};