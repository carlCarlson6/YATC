"use client"

import { Box, Dialog, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineQuickreply } from "react-icons/md";
import { PickEmojiDialogConent } from "./PickEmojiDialogConent";
import { publishReactionAction } from "src/server/emojeets/react/api";
import { useRouter } from "next/navigation";

export const useAddReaction = (emojeetId: string) => {
  const [emoji, setEmoji] = useState("");
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  return {
    emoji,
    isOpen: open,
    setIsOpen: setOpen,
    setEmoji,
    send: async () => {
      setIsSending(true);
      await publishReactionAction({reaction: emoji, emojeetId: emojeetId});
      setEmoji("");
      setOpen(false);
      setIsSending(false);
      router.refresh();
    },
    canSend: emoji.length > 0,
    isSending
  };
}

export const AddReaction = ({emojeetId}: {emojeetId: string}) => {
  const { emoji, isOpen, setIsOpen, setEmoji, isSending, canSend, send } = useAddReaction(emojeetId);

  return (<>
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <OpenAddReactionDialog />
      <PickEmojiDialogConent 
        emoji={emoji} 
        setEmoji={setEmoji} 
        isSending={isSending} 
        canSend={canSend} 
        send={send} 
      />
    </Dialog.Root>
  </>);
};

const OpenAddReactionDialog = () => (<>
  <Dialog.Trigger>
    <Box pt={'2'} pr={'2'}>
      <IconButton variant={'outline'} style={{cursor: 'pointer'}}>
        <MdOutlineQuickreply />
      </IconButton>
    </Box>
  </Dialog.Trigger>
</>);