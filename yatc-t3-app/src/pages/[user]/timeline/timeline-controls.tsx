import { Box, Button, Dialog, Flex, TextArea, Text, IconButton, HoverCard } from "@radix-ui/themes";
import { PlusCircledIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const TimeLineControls: React.FC<{}> = () => {
  const [newTweetText, setNewTweetText] = useState("");
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Dialog.Root>
        <HoverCard.Root>
          <HoverCard.Trigger>
          <Dialog.Trigger>
            <Button
              variant={'outline'}
              style={{ cursor: 'pointer' }}
            >
              <Flex
                align={'center'}
                justify={'center'}
                direction={'row'}
                gap={'3'}
              >
                <PlusCircledIcon />
              </Flex>
            </Button>
            </Dialog.Trigger>
          </HoverCard.Trigger>
          <HoverCard.Content size={'1'}>
            <Text color={'indigo'}>publish a new tweet</Text>
          </HoverCard.Content>
        </HoverCard.Root>
        <Dialog.Content>
          <Flex direction={'column'} gap={'3'}>
            <TextArea 
              size={'3'}
              placeholder="What are you thinking about ... ?"
              value={newTweetText}
              onChange={e => setNewTweetText(e.target.value)}
            />
            <Flex align={'center'} justify={'between'}>
              <Flex gap={'3'} align={'center'}>
                <progress value={newTweetText.length/280} />
                <Text
                  color={newTweetText.length < 280 ? "indigo" : "red"}
                >
                  {newTweetText.length}/280
                </Text>
              </Flex>
              <Flex gap={'3'}>
                <Dialog.Close onClick={_ => setNewTweetText("")}>
                  <IconButton color="plum" variant="outline" style={{ cursor: 'pointer' }} disabled={newTweetText.length > 280}>
                    <UploadIcon />
                  </IconButton>
                </Dialog.Close>
                <Dialog.Close onClick={_ => setNewTweetText("")}>
                  <IconButton color="red" variant='outline' style={{ cursor: 'pointer' }}>
                    <TrashIcon />
                  </IconButton>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

const NewTweetForm = () => {
  
}