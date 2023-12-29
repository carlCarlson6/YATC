"use client"

import { Box, Button, Flex, Separator } from "@radix-ui/themes";
import React from "react";
import { Follow } from "./Follow";
import { BackToTimeline } from "./BackToTimeline";
import { MdOutlineEdit } from "react-icons/md";

export const UserProfileControls: React.FC<{
  userId: string,
  isOwnProfile: boolean, 
  followed: boolean
}> = ({isOwnProfile, followed, userId}) => (
<>
  <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
    <Flex direction={'column'} gap={'2'}>
      { isOwnProfile ?
        <EditProfileButton /> :
        <Follow followed={followed} userId={userId} />
      }
      <Separator size={'4'}/>
      <BackToTimeline />
    </Flex>
  </Box>
</>);

export const EditProfileButton = () => (
  <Button
    variant={'outline'}
    style={{ cursor: 'pointer' }}
  >
    <MdOutlineEdit />
  </Button>
);