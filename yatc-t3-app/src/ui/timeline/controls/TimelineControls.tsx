import { Box, Flex } from "@radix-ui/themes";
import type { User } from "yact/server/user/user";
import { AddTweetButton } from "./AddTweetButton";
import { RealoadButton } from "./RealoadButton";
import { UserProfileButton } from "./UserProfileButton";
import { SearchUsersButton } from "./SearchUsersButton";

export const TimeLineControls: React.FC<{user: User}> = ({user}) => {
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Flex direction={'column'} gap={'2'}>
        <AddTweetButton />
        <RealoadButton />
        <UserProfileButton user={user}/>
        <SearchUsersButton />
      </Flex>
    </Box>
  );
};