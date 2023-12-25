import { Box, Flex } from "@radix-ui/themes";
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import { UserProfileButton } from "./UserProfileButton";
import AddEmojeet from "./AddEmojeet";
import { SearchUsers } from "./SearchUsers";
import { Reload } from "./Reload";

export const TimeLineControls: React.FC<{user: User}> = ({user}) => (
  <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
    <Flex direction={'column'} gap={'2'}>
      <AddEmojeet />
      <Reload />
      <UserProfileButton user={user} />
      <SearchUsers />
    </Flex>
  </Box>
);