"use client"

import { Card, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import { CardButtons } from "./CardButtons";
import { EmojeetInfo } from "./EmojeetInfo";
import { UserInfo } from "./UserInfo";

export const EmojeetCard = ({ emojeet }: { emojeet: Emojeet; }) => {
  const [reactions, setReactions] = useState(emojeet.reactions);
  const updateReactions = (emoji: string) => setReactions([...reactions, {emoji}]);
  return (<>
    <Card
      key={emojeet.id}
      size={'1'}
      variant={'surface'}
      style={{
        width: '30rem'
      }}
    >
      <Flex
        gap={'1'}
        align={'start'}
        direction={'column'}
        justify={'center'}
      >
        <UserInfo user={emojeet.user} />
        <EmojeetInfo emoji={emojeet.emoji} reactions={reactions} />
        <CardButtons emojeetId={emojeet.id} updateReactions={updateReactions} />
      </Flex>
    </Card>
  </>);
};

