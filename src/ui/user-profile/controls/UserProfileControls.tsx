"use client"

import { Box, Button, Dialog, Flex, Separator, TextField, Text, Code, DialogClose } from "@radix-ui/themes";
import React, { useState } from "react";
import { Follow } from "./Follow";
import { BackToTimeline } from "./BackToTimeline";
import { MdOutlineEdit } from "react-icons/md";
import * as Label from '@radix-ui/react-label';
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import type { UserProfileData } from "src/app/user/[userName]/page";
import { SendButton } from "src/ui/SendButton";

export const UserProfileControls: React.FC<{data: UserProfileData}> = ({data}) => (
<>
  <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
    <Flex direction={'column'} gap={'2'}>
      { data.isOwnProfile ?
        <EditProfile user={data} /> :
        <Follow followed={data.followed} userId={data.id} />
      }
      <Separator size={'4'}/>
      <BackToTimeline />
    </Flex>
  </Box>
</>);

export const EditProfile = ({user}: {user: User}) => {
  const { userName, updateUserName, canSend, isSending, send, setIsOpen, isOpen } = useEditProfile(user);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button
          variant={'outline'}
          style={{ cursor: 'pointer' }}
        >
          <MdOutlineEdit />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction={'column'} gap={'2'}>
          <Flex align={'center'} direction={'row'} gap={'2'}>
            <Label.Root>
              <Text>
                <Code>name</Code>
              </Text>
            </Label.Root>
            <TextField.Root>
              <TextField.Input 
                placeholder="your user name" 
                value={userName}
                onChange={e => updateUserName(e.target.value)}
              />
            </TextField.Root>
          </Flex>
          <Flex justify={'end'}>
            <SendButton
              isSending={isSending}
              canSend={canSend}
              send={send} />
          </Flex>
        </Flex>
      </Dialog.Content>
      <DialogClose></DialogClose>
    </Dialog.Root>
  );
};

const useEditProfile = (user: User) => {
  const [userName, setUserName] = useState(user.name);
  const [open, setOpen] = useState(false);

  const send = () => {
    throw new Error("not implemented");
  }

  return {
    userName,
    updateUserName: setUserName,
    canSend: userName.length > 0 && userName !== user.name,
    isSending: false,
    send,
    isOpen: open,
    setIsOpen: setOpen,
  };
}