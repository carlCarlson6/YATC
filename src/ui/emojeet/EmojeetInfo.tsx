"use client";
import { Box, Flex, Text, Grid } from "@radix-ui/themes";
import React from "react";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import { useId } from "react";

export const EmojeetInfo: React.FC<
  { emoji: string; } &
  Pick<Emojeet, "reactions">> = ({
    emoji, reactions
  }) => (<>
    <Flex pl={'8'} pb={'1'} gap={'7'}>
      <Box>
        <Text as="div" size="9">
          {emoji}
        </Text>
      </Box>
      <Box>
        <Reactions emojis={reactions.map(x => x.emoji)} />
      </Box>
    </Flex>
</>);

const Reactions = ({
  emojis
}: {
  emojis: string[],
}) => (
  <Flex direction={'row'} align={'center'} justify={'start'} gap={'2'}>
    <Grid 
      columns={`${Math.floor(Math.sqrt(emojis.length)+1)}`} 
      gap={'2'} 
      pt={'2'} 
      pr={'2'}
    >
      {emojis.map(x => (
        <EmojiReaction key={x} emoji={x} />
      ))}
    </Grid>
  </Flex>
);

const EmojiReaction = ({emoji}: {emoji: string}) => {
  const id = useId();
  return (
    <Text key={id} size={'6'}>{emoji}</Text>
  );
}