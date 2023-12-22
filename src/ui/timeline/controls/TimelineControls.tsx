import { Box, Flex } from "@radix-ui/themes";
import type { User } from "src/server/user/user";
import AddEmojeet from "./AddEmojeet";
import { RealoadButton } from "./RealoadButton";
import { UserProfileButton } from "./UserProfileButton";
import { SearchUsersButton } from "./SearchUsersButton";

export const TimeLineControls: React.FC<{user: User}> = ({user}) => {
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Flex direction={'column'} gap={'2'}>
        <AddEmojeet />
        <RealoadButton />
        <UserProfileButton user={user}/>
        <SearchUsersButton />
      </Flex>
    </Box>
  );
};