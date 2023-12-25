"use client"

import { Box, Flex, Grid, Text } from "@radix-ui/themes";
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
          <Text size={'6'}>{r.emoji}</Text>
        ))}
      </Grid>
    </Flex>
  );
};