"use client";
import { Box, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import React from "react";
import EmojiPicker, { SuggestionMode, Theme } from "emoji-picker-react";
import { SyncLoader } from "react-spinners";
import { UploadIcon } from "@radix-ui/react-icons";

export const PickEmojiDialogConent = ({
  emoji, setEmoji, isSending, canSend, send
}: {
  emoji: string;
  setEmoji: (emoji: string) => void;
  isSending: boolean;
  canSend: boolean;
  send: () => Promise<void>;
}) => (<>
  <Dialog.Content>
    <Flex direction={'column'} gap={'3'}>
      <PickEmoji emoji={emoji} setEmoji={setEmoji} />
      <DialogButtons
        isSending={isSending}
        canSend={canSend}
        send={send} />
    </Flex>
  </Dialog.Content>
</>);

const PickEmoji: React.FC<{
  emoji: string;
  setEmoji: (emoji: string) => void;
}> = ({
  emoji, setEmoji
}) => (<>
  <Flex direction={'row'} gap={'9'}>
    <EmojiPicker
      suggestedEmojisMode={SuggestionMode.FREQUENT}
      theme={Theme.DARK}
      onEmojiClick={x => setEmoji(x.emoji)} />
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Text size={'9'}>{emoji}</Text>
    </Flex>
  </Flex>
</>);

const DialogButtons: React.FC<{
  isSending: boolean,
  canSend: boolean,
  send: () => void,
}> = ({
  isSending, canSend, send
}) => (<>
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
</>);