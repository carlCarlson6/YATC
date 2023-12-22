import { Avatar, Box, Card, Flex, Text, Link, Separator } from "@radix-ui/themes";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import type { User } from "src/server/user/user";

const EmojeetDisplay = ({ emojeets }: { emojeets: Emojeet[]; }) => (
  <Box>
    <Flex
      gap={'3'}
      direction={'column'}
    > {emojeets.map(x =>
      <Card 
        key={x.id}
        size={'1'} 
        className="tweet"
      >
        <Flex gap="4">
          <EmojeetDisplayUser user={x.user}/>
          <Separator orientation={'vertical'} size={'3'} />
          <EmojeetDisplayEmoji emoji={x.emoji}/>
        </Flex>
      </Card>
    )}</Flex>
  </Box>
);

export default EmojeetDisplay;

const EmojeetDisplayUser = ({user}: {user: User}) => (
  <Flex justify={'center'} align={'center'} direction={'column'} gap={'1'}>
    <a 
      href={`/user/${user.name}`} 
      style={{cursor: 'pointer'}}
    >
      <Avatar 
        src={user.avatar} 
        alt={user.name} 
        size="3" 
        radius="full" 
        fallback={user.name} 
        color="indigo" 
      />
    </a>
    <Link 
      href={`/user/${user.name}`} 
      color={'violet'} 
      weight={'light'} 
      style={{cursor: 'pointer'}}
    >
      <Text as="div" size="2" weight="bold">
        {user.name}
      </Text>
    </Link>
  </Flex>
);

const EmojeetDisplayEmoji = ({emoji}: {emoji: string}) => (
  <Text as="div" size="9">
    {emoji}
  </Text>
);