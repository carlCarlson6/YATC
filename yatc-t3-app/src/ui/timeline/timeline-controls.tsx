import { Box, Button, Dialog, Flex, TextArea, Text, IconButton, HoverCard } from "@radix-ui/themes";
import { PlusCircledIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { api } from "../api";
import { useTimeline } from "./store";
import { SyncLoader } from "react-spinners";

const useAddTweet = () => {
  const addTweet = useTimeline(x => x.addTweet);
  const [open, setOpen] = useState(false);
  const [newTweetText, setNewTweetText] = useState("");
  const { mutate, isLoading } = api.sendTweet.useMutation({onSuccess: (result) => {
    addTweet(result);
    setNewTweetText("");
    setOpen(false);
  }});

  return {
    newTweet: {
      text: newTweetText,  
      progress: newTweetText.length/280,
      color: ((): "indigo" | "red" => newTweetText.length < 280 ? "indigo" : "red")(),
      length: newTweetText.length,
    },
    form: {
      isOpen: open,
      setIsOpen: setOpen,
      onClose: () => setNewTweetText(""),
      setText: setNewTweetText,
      send: () => mutate({text: newTweetText}),
      canSend: newTweetText.length <= 0 || newTweetText.length > 280,
      isSending: isLoading
    }
  };
}

export const TimeLineControls: React.FC = () => {
  const { newTweet, form } = useAddTweet();

  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Dialog.Root open={form.isOpen} onOpenChange={form.setIsOpen}>
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
              value={newTweet.text}
              onChange={e => form.setText(e.target.value)}
            />
            <Flex align={'center'} justify={'between'}>
              <Flex gap={'3'} align={'center'}>
                <progress value={newTweet.progress} />
                <Text
                  color={newTweet.color}
                >
                  {newTweet.length}/280
                </Text>
              </Flex>
              <Flex gap={'3'}>
                {form.isSending ?
                  <Box pt={'1'}>
                    <SyncLoader
                      size={7}
                      color="#9EB1FF"
                      speedMultiplier={0.5}
                    />
                  </Box>
                  :
                  <><IconButton 
                    color="plum" 
                    variant="outline" 
                    style={{ cursor: 'pointer' }} 
                    disabled={form.canSend}
                    onClick={form.send}
                  >
                    <UploadIcon />
                  </IconButton> 
                  <Dialog.Close onClick={form.onClose}>
                    <IconButton color="red" variant='outline' style={{ cursor: 'pointer' }}>
                      <TrashIcon />
                    </IconButton>
                  </Dialog.Close></>
                }
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};