import { Box, Button, Dialog, Flex, Text, IconButton } from "@radix-ui/themes";
import { PlusCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { SyncLoader } from "react-spinners";
import { useAddEmojeet } from "./useAddEmojeet";
import EmojiPicker, { SuggestionMode, Theme } from 'emoji-picker-react';
import React from "react";

export default function AddEmojeet() {
  const { emoji, isOpen, setIsOpen, setEmoji, isSending, canSend, send, onClose } = useAddEmojeet();
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <OpenDialogButton />
      <Dialog.Content>
        <Flex direction={'column'} gap={'3'}>
          <PickEmoji emoji={emoji} setEmoji={setEmoji} />
          <DialogButtons
            isSending={isSending}
            canSend={canSend}
            send={send}
            onClose={onClose} />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const OpenDialogButton = () => (
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
);

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
      onEmojiClick={x => setEmoji(x.emoji)} 
    />
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Text size={'9'}>{emoji}</Text>
    </Flex>
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
  <Flex justify={'end'}>{
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
      </>
  }</Flex>
);