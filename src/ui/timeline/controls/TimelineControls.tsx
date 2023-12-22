import { Box, Flex } from "@radix-ui/themes";
import type { User } from "src/server/user/userProfile.drizzle.schema";
import { RealoadButton } from "./RealoadButton";
import { UserProfileButton } from "./UserProfileButton";


export const TimeLineControls: React.FC<{user: User}> = ({user}) => {
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Flex direction={'column'} gap={'2'}>
        <>TODO AddEmojeet</>
        <RealoadButton />
        <UserProfileButton user={user}/>
        <>TODO SearchUsersButton</>
      </Flex>
    </Box>
  );
};