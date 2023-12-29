"use client"

import { Button, Dialog, Flex } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useAddEmojeet } from "./useAddEmojeet";
import React from "react";
import { PickEmojiDialogConent } from "src/ui/emojeet/PickEmojiDialogConent";

export default function AddEmojeet() {
  const { emoji, isOpen, setIsOpen, setEmoji, isSending, canSend, send } = useAddEmojeet();
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <OpenDialogButton />
      <PickEmojiDialogConent 
        emoji={emoji} 
        setEmoji={setEmoji} 
        isSending={isSending} 
        canSend={canSend} 
        send={send} 
      />
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
