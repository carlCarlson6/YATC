import { Avatar, Box, Card, Flex, Text, Link, Separator } from "@radix-ui/themes";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { AddReaction } from "./AddReaction";

export const EmojeetsDisplay = ({ emojeets }: { emojeets: Emojeet[] }) => (
  <Box>
    <Flex
      gap={'3'}
      direction={'column'}
    > {emojeets.map(x =>
      <EmojeetDisplay emojeet={x}/>
    )}</Flex>
  </Box>
);

export const EmojeetDisplay = ({ emojeet }: { emojeet: Emojeet }) => {
  return (<>
    <Card 
      key={emojeet.id}
      size={'1'} 
      className="tweet"
      style={{ maxWidth: 270 }}
    >
      <Flex gap="4" pb={'2'}>
        <EmojeetDisplayUser user={emojeet.user}/>
        <Separator orientation={'vertical'} size={'3'} />
        <EmojeetDisplayEmoji emoji={emojeet.emoji}/>
      </Flex>
      <Separator size={'4'}/>
      <Flex direction={'row'} align={'center'} justify={'start'} gap={'2'}>
        <AddReaction emojeetId={emojeet.id}/>
        { emojeet.reactions.map(r => (<>
          <Text size={'6'}>{r.emoji}</Text>
        </>))}
      </Flex>
    </Card>
  </>);
}

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