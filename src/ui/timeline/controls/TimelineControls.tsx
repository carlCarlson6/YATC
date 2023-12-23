import { Box, Flex } from "@radix-ui/themes";
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { RealoadButton } from "./RealoadButton";
import { UserProfileButton } from "./UserProfileButton";
import AddEmojeet from "./AddEmojeet";
import { SearchUsers } from "./SearchUsers";


export const TimeLineControls: React.FC<{user: User}> = ({user}) => {
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Flex direction={'column'} gap={'2'}>
        <AddEmojeet/>
        <RealoadButton />
        <UserProfileButton user={user}/>
        <SearchUsers />
      </Flex>
    </Box>
  );
};