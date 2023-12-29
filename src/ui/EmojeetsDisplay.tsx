import { Box, Flex } from "@radix-ui/themes";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import { EmojeetCard } from "./EmojeetDisplayRefactor";

export const EmojeetsDisplay = ({ emojeets }: { emojeets: Emojeet[] }) => (
  <Box>
    <Flex
      gap={'3'}
      direction={'column'}
    > {emojeets.map(x =>
      <Box key={x.id}>
        <EmojeetCard emojeet={x}/>
      </Box>
    )}</Flex>
  </Box>
);
