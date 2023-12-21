import { Box, Button, Dialog, Flex, TextArea, Text, IconButton } from "@radix-ui/themes";
import { PlusCircledIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { SyncLoader } from "react-spinners";
import { useAddTweet } from "./useAddTweet";
import EmojiPicker, { SuggestionMode, Theme } from 'emoji-picker-react';
import React from "react";

export const AddTweetButton = () => {
  const { emoji, form } = useAddTweet();
  return (
    <Dialog.Root open={form.isOpen} onOpenChange={form.setIsOpen}>
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
      <Dialog.Content>
        <Flex direction={'column'} gap={'3'}>

          <PickEmoji emoji={emoji} setEmoji={form.setEmoji}/>
          
          <DialogButtons 
            isSending={form.isSending}
            canSend={form.canSend}
            send={form.send}
            onClose={form.onClose}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const PickEmoji: React.FC<{
  emoji: string, 
  setEmoji: (emoji: string) => void
}> = ({
  emoji, 
  setEmoji
}) => (
  <Flex direction={'row'} gap={'9'}>
    <EmojiPicker
      suggestedEmojisMode={SuggestionMode.FREQUENT}
      theme={Theme.DARK}
      onEmojiClick={x => setEmoji(x.emoji)} />
    <Text size={'9'}>{emoji}</Text>
  </Flex>
);

const DialogButtons: React.FC<{
  isSending: boolean,
  canSend: boolean,
  send: () => void,
  onClose: () => void
}> = ({
  isSending, canSend, send, onClose
}) => (
  <Flex justify={'end'} gap={'3'}>{
    isSending ?
      <Box pt={'1'}>
        <SyncLoader
          size={7}
          color="#9EB1FF"
          speedMultiplier={0.5}
        />
      </Box> :
      <>
        <IconButton
          color="plum"
          variant="outline"
          style={{ cursor: 'pointer' }}
          disabled={!canSend}
          onClick={send}
        >
          <UploadIcon />
        </IconButton>
        <Dialog.Close onClick={onClose}>
          <IconButton color="red" variant='outline' style={{ cursor: 'pointer' }}>
            <TrashIcon />
          </IconButton>
        </Dialog.Close>
      </>
  }</Flex>
);