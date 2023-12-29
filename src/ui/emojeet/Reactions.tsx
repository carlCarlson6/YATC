"use client"

import { Flex, Grid, Text } from "@radix-ui/themes";
import { useId } from "react";

export const Reactions = ({
  emojis
}: {
  emojis: string[],
}) => {
  return (
    <Flex direction={'row'} align={'center'} justify={'start'} gap={'2'}>
      <Grid columns={`${Math.round(emojis.length/2)}`} gap={'2'} pt={'2'} pr={'2'}>
        {emojis.map(x => (
          <EmojiReaction key={x} emoji={x} />
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