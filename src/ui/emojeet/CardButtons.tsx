"use client";

import { Flex, Popover } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { Box, Dialog, IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineQuickreply } from "react-icons/md";
import { PickEmojiDialogConent } from "./PickEmojiDialogConent";
import { publishReaction } from "src/server/api";
import { useCopyToClipboard } from 'usehooks-ts'
import { Share1Icon } from "@radix-ui/react-icons";

export const CardButtons: React.FC<{
  emojeetId: string;
  updateReactions: (emoji: string) => void;
}
> = ({
  emojeetId, updateReactions,
}) => (<>
  <Flex justify={'start'} gap={'2'} width={'100%'}>
    <AddReaction emojeetId={emojeetId} updateReactions={updateReactions} />
    <ShareEmojeet emojeetId={emojeetId} />
  </Flex>
</>);

const useAddReaction = (
  emojeetId: string, 
  updateReactions: (emoji: string) => void
) => {
  const [emoji, setEmoji] = useState("");
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  return {
    emoji,
    isOpen: open,
    setIsOpen: setOpen,
    setEmoji,
    send: async () => {
      setIsSending(true);
      await publishReaction({reaction: emoji, emojeetId: emojeetId});
      updateReactions(emoji)
      setEmoji("");
      setOpen(false);
      setIsSending(false);
    },
    canSend: emoji.length > 0,
    isSending
  };
}
  
const AddReaction = ({emojeetId, updateReactions}: {
  emojeetId: string,
  updateReactions: (emoji: string) => void
}) => {
  const { emoji, isOpen, setIsOpen, setEmoji, isSending, canSend, send } = useAddReaction(emojeetId, updateReactions);
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
    <Box>
      <IconButton variant={'outline'} style={{cursor: 'pointer'}}>
        <MdOutlineQuickreply />
      </IconButton>
    </Box>
  </Dialog.Trigger>
</>);

const ShareEmojeet = ({emojeetId}: {emojeetId: string}) => {
  const appUrl = useAppUrl();
  const copy = useCopyToClipboard()[1];
  return (<>
    <Box>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant={'outline'} style={{cursor: 'pointer'}} onClick={_ => copy(`${appUrl}/emojeet/${emojeetId}`)}>
            <Share1Icon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content size={'1'}>
          <Text size={'2'}>copied to clipboard!</Text>
        </Popover.Content>
      </Popover.Root>
    </Box>
  </>);
}

const useAppUrl = () => {
  const [serverUrl, setServerUrl] = useState("");
	useEffect(() => {
		//setServerUrl(window.location.href);
    setServerUrl(window.location.host);
	}, []);
  //return serverUrl.split('/timeline').at(0)?.split('/user').at(0) ?? "";
  return serverUrl;
}