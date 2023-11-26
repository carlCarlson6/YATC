import { Box, Button, Flex, Separator } from "@radix-ui/themes";
import React from "react";
import { FollowButton } from "./FollowButton";
import { BackToTimelineButton } from "./BackToTimelineButton";
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
        <FollowButton followed={followed} userId={userId} />
      }
      <Separator size={'4'}/>
      <BackToTimelineButton />
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