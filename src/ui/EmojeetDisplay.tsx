import { Avatar, Box, Card, Flex, Text, Link } from "@radix-ui/themes";
import type { Emojeet } from "src/server/timeline/EmojiTweet";

const EmojeetDisplay: React.FC<{ emojeets: Emojeet[]; }> = ({ emojeets }) => (
  <Box>
    <Flex
      gap={'3'}
      direction={'column'}
    > 
    {emojeets.map(x =>
      <Card 
        key={x.id}
        size={'1'} 
        className="tweet"
      >
        <Flex gap="4" align={'start'}>
          <a 
            href={`/user/${x.user.name}`} 
            style={{cursor: 'pointer'}}
          >
            <Avatar 
              src={x.user.avatar} 
              alt={x.user.name} 
              size="3" 
              radius="full" 
              fallback={x.user.name} 
              color="indigo" 
            />
          </a>
          <Box width={'max-content'}>
            <Link 
              href={`/user/${x.user.name}`} 
              color={'violet'} 
              weight={'light'} 
              style={{cursor: 'pointer'}}
            >
              <Text as="div" size="2" weight="bold">
                {x.user.name}
              </Text>
            </Link>
            <Text as="div" size="3" color="indigo">
              {x.emoji}
            </Text>
          </Box>
        </Flex>
      </Card>
    )}
    </Flex>
  </Box>
);

export default EmojeetDisplay;