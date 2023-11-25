import { Avatar, Box, Card, Flex, Text, Link } from "@radix-ui/themes";
import type { Tweet } from "yact/server/timeline/build-timeline";

export const TweetsDisplay: React.FC<{ tweets: Tweet[]; }> = ({ tweets }) => (
  <Box>
    <Flex
      gap={'3'}
      direction={'column'}
    > {tweets.map(x => <>
      <Card id={x.id} size={'1'} className="tweet">
        <Flex gap="4" align={'start'}>
          <a href={`/user/${x.user.name}`} style={{cursor: 'pointer'}}>
            <Avatar src={x.user.avatar} alt={x.user.name} size="3" radius="full" fallback={x.user.name} color="indigo" />
          </a>
          <Box width={'max-content'}>
            <Link href={`/user/${x.user.name}`} color={'violet'} weight={'light'} style={{cursor: 'pointer'}}>
              <Text as="div" size="2" weight="bold">
                {x.user.name}
              </Text>
            </Link>
            <Text as="div" size="3" color="indigo">
              {x.text}
            </Text>
          </Box>
        </Flex>
      </Card>
    </>)}</Flex>
  </Box>
);
