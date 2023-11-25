import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useTimeline } from "./store";

export const TimelineDisplay: React.FC = () => {
  const timeline = useTimeline(x => x.timeline);
  return (
    <Box style={{ width: '85%', float: 'right' }}>
      <Flex
        gap={'3'}
        direction={'column'}
      > {timeline.map(x => <>
        <Card id={x.id} size={'1'} className="tweet">
          <Flex gap="4" align={'start'}>
            <Avatar src={x.user.avatar} alt={x.user.name} size="3" radius="full" fallback={x.user.name} color="indigo" />
            <Box width={'max-content'}>
              <Text as="div" size="2" weight="bold" color="gray">
                {x.user.name}
              </Text>
              <Text as="div" size="3" color="indigo">
                {x.text}
              </Text>
            </Box>
          </Flex>
        </Card>
      </>)}</Flex>
    </Box>
  );
};
