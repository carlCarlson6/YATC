"use client"

import { Flex, Grid, Text } from "@radix-ui/themes";
import { AddReaction } from "./AddReaction";
import { useId, useState } from "react";

export const Reactions = ({
  emojeetId, emojeetReactions
}: {
  emojeetId: string;
  emojeetReactions: { emoji: string; }[];
}) => {
  const [reactions, setReactions] = useState<typeof emojeetReactions>(emojeetReactions);
  const updateReactions = (emoji: string) => setReactions([...reactions, {emoji}]);
  return (
    <Flex direction={'row'} align={'center'} justify={'start'} gap={'2'}>
      <AddReaction emojeetId={emojeetId} updateReactions={updateReactions}/>
      <Grid columns={'8'} gap={'2'} pt={'2'} pr={'2'}>
        {reactions.map(r => (
          <EmojiReaction key={r.emoji} emoji={r.emoji} />
        ))}
      </Grid>
    </Flex>
  );
};

const EmojiReaction = ({emoji}: {emoji: string}) => {
  const id = useId();
  return (
    <Text key={id} size={'6'}>{emoji}</Text>
  );
}