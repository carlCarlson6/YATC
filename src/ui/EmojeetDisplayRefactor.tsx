"use client"

import { Avatar, Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { Reactions } from "./Reactions";
import { AddReaction } from "./AddReaction";

export const EmojeetCard = ({ emojeet }: { emojeet: Emojeet; }) => (<>
  <Card
    key={emojeet.id}
    size={'1'}
    variant={'surface'}
  >
    <Flex
      gap={'3'}
      align={'start'}
      direction={'column'}
      justify={'center'}
    >
      <UserInfo user={emojeet.user} />
      <EmojeetInfo data={{ ...emojeet }} />
      <CardButtons data={{ ...emojeet }} />
    </Flex>
  </Card>
</>);

const UserInfo = ({user}: {user: User}) => (<>
  <Flex align={'center'} gap={'3'} pb={'3'}>
    <Box>
      <a
        href={`/user/${user.name}`}
        style={{ cursor: 'pointer' }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          size="3"
          radius="full"
          fallback={user.name}
          color="indigo" />
      </a>
    </Box>
    <Box>
      <Link
        href={`/user/${user.name}`}
        color={'violet'}
        weight={'light'}
        style={{ cursor: 'pointer' }}
      >
        <Text as="div" size="2" weight="bold">
          {user.name}
        </Text>
      </Link>
    </Box>
  </Flex>
</>);

const EmojeetInfo: React.FC<{data: Omit<Emojeet, "user">}> = ({
  data: {id, emoji, reactions, publishedAt}
}) => (<>
  <Flex pl={'8'} pb={'1'} gap={'7'}>
    <Box>
      <Text as="div" size="9">
        {emoji}
      </Text>
    </Box>
    <Box>
      <Reactions emojeetId={id} emojeetReactions={reactions}/>
    </Box>
  </Flex>
</>);

const CardButtons: React.FC<{data: Omit<Emojeet, "user">}> = ({
  data: {id, emoji, reactions: emojeetReactions, publishedAt}
}) => {
  const [reactions, setReactions] = useState<typeof emojeetReactions>(emojeetReactions);
  const updateReactions = (emoji: string) => setReactions([...reactions, {emoji}]);
  return (<>
    <Flex pr={'9'}>
      <AddReaction emojeetId={id} updateReactions={updateReactions} />
    </Flex>
  </>);
};