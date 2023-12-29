"use client";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import React from "react";
import EmojiPicker, { SuggestionMode, Theme } from "emoji-picker-react";
import { SendButton } from "../SendButton";

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
      <SendButton
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

